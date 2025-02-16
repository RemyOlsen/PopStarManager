// I'm using <NavLink> here instead of <Link> because I want to style the active link differently from the inactive link.

import { NavLink } from "react-router-dom";

function Navbar() {

    enum NavLinkStyles {
        ACTIVE = "block py-2 px-4 text-music-green font-bold border-b-2 border-music-green",
        INACTIVE = "block py-2 px-4 text-white hover:border-b-2 hover:border-music-green"
    }

    const isActiveStyle: string = NavLinkStyles.ACTIVE;
    const isInactiveStyle: string = NavLinkStyles.INACTIVE;

    return (

    <nav className="bg-music-black shadow sticky top-0 z-50">
      <div className="w-full py-3 flex justify-center">
        <ul className="flex space-x-4">
            <li>
                <NavLink to="/" className={({ isActive }) =>
                    isActive ? isActiveStyle : isInactiveStyle
                }>
                    Pop Stars
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin" className={({ isActive }) =>
                    isActive ? isActiveStyle : isInactiveStyle
                }>
                    Admin
                </NavLink>
            </li>
        </ul>
      </div>
    </nav>
    )
}

export default Navbar;