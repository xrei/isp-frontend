import React from 'react'
import styled from 'styled-components'

export const Table = styled.table`
  background-color: #424242;
  border-collapse: collapse;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-style: hidden;
  box-shadow: 0 0 0 1px #424242;
`

export const TableHead = styled.thead`
  width: 100%;
`
export const TableBody = styled.tbody`
  width: 100%;
`

type TableCellProps = {
  className?: string
  comp?: 'th' | 'td'
}

const StyledTableCell = styled.div`
  border-bottom: 1px solid rgba(81, 81, 81, 1);
  color: #fff;
  padding: 10px;
  text-align: left;
`

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  comp,
}) => {
  let Component = comp || 'td'

  return (
    <StyledTableCell as={Component} className={className}>
      {children}
    </StyledTableCell>
  )
}

export const TableRow = styled.tr``
