import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { $menuState, toggleMenu } from './model'
import { MenuList } from './MenuList'

export const MainLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <NavigationBar>
        <BurgerMenu></BurgerMenu>
        <h2>ISP</h2>
      </NavigationBar>
      <Main>{children}</Main>
      <SideMenu>
        <MenuList></MenuList>
      </SideMenu>
    </Container>
  )
}

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  color: #fff;
  width: 100%;
  height: 60px;
  background-color: #3949ab;
  padding: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`
const NavigationBar: React.FC = ({ children }) => {
  return <Navigation>{children}</Navigation>
}

const BurgerMenuContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  margin-right: 16px;

  &.active {
    .bar1 {
      transform: rotate(-45deg) translate(-9px, 6px);
    }
    .bar2 {
      opacity: 0;
    }
    .bar3 {
      transform: rotate(45deg) translate(-8px, -8px);
    }
  }
`
const BurgerMenuBar = styled.div`
  width: 35px;
  height: 5px;
  background-color: #fff;
  margin: 6px 0;
  transition: 0.4s;
`

const BurgerMenu: React.FC = () => {
  const isActive = useStore($menuState)

  return (
    <BurgerMenuContainer
      className={isActive ? 'active' : ''}
      onClick={() => toggleMenu()}
    >
      <BurgerMenuBar className="bar1"></BurgerMenuBar>
      <BurgerMenuBar className="bar2"></BurgerMenuBar>
      <BurgerMenuBar className="bar3"></BurgerMenuBar>
    </BurgerMenuContainer>
  )
}

const SideMenuContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  flex-flow: column;
  width: 300px;
  padding: 16px;
  background-color: #fff;
  transform: translateX(-300px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition-property: transform;
  transition: 0.25s ease;
  z-index: 100;

  &.active {
    transform: translateX(0);
  }
`

const SideMenuOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`

const SideMenu: React.FC = ({ children }) => {
  const isActive = useStore($menuState)

  return (
    <>
      <SideMenuContainer className={isActive ? 'active' : ''}>
        {children}
      </SideMenuContainer>
      {isActive && (
        <SideMenuOverlay onClick={() => toggleMenu()}></SideMenuOverlay>
      )}
    </>
  )
}

const Main = styled.main`
  padding: 16px;
  height: 100%;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`
