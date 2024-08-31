import { Link, useNavigate } from 'react-router-dom';
import { LuUsers2 } from "react-icons/lu";
import { SlNotebook } from "react-icons/sl";
import { RiAdminFill } from "react-icons/ri";



export default function Sidebar () {

    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                <li>
                    <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                </li>
        
               

                <li>
                    <Link to="/admin/blogs"><SlNotebook/> Blogs</Link>
                </li>

                <li>
                    <Link to="/admin/users"><LuUsers2/>Blogers</Link>
                </li>

                <li>
                    <Link to="/admin/admins"><RiAdminFill/>Admins</Link>
                </li>
                

               
        
            </ul>
            </nav>
        </div>
    )
}