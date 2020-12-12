import { createStore, createEvent } from 'effector'

export const $menuState = createStore(false)

export const toggleMenu = createEvent('toggleMenu')

$menuState.on(toggleMenu, (state) => !state)
