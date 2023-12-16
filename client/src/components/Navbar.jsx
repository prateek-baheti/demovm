import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import 'bootstrap/dist/css/bootstrap.css';
export const Navbar = () => {
    
const {isLoggedIn} = useAuth();
    return(
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">
                            Result Management System
                        </NavLink>
                    </div>
                    <nav>
                        <ul className="nav-links">
                            <li >
                            <NavLink to="/">Home</NavLink>
                            </li>
                            {isLoggedIn ? (
                                <li >
                                <NavLink to="/logout">Logout</NavLink>
                                </li>
                            ):(
                                <>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>

            </header>
        </>
    );
};