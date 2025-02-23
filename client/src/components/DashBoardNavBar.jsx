import React from 'react'
import { NavLink } from 'react-router-dom'

const DashBoardNavBar = () => {
  return (
    <nav id="dashboard-navbar">
        <ul>
            <li>
                <NavLink>Insights</NavLink>
            </li>
            <li>
                <NavLink>Items</NavLink>
            </li>
            <li>
                <NavLink>Leased</NavLink>
            </li>
            <li>
                <NavLink>Orders</NavLink>
            </li>
            <li>
                <NavLink></NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default DashBoardNavBar