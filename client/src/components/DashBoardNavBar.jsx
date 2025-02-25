import React from 'react'
import { NavLink } from 'react-router-dom'

const DashBoardNavBar = () => {
  return (
    <nav id="dashboard-navbar">
        <ul>
            <li>
                <NavLink to={"/dashboard/insights"}>Insights</NavLink>
            </li>
            <li>
                <NavLink to={"/dashboard/items"}>Items</NavLink>
            </li>
            <li>
                <NavLink to={"/dashboard/leased"}>Leased</NavLink>
            </li>
            <li>
                <NavLink to={"/dashboard/orders"}>Orders</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default DashBoardNavBar