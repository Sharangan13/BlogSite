import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { adminUpdateUserDetailClear, clearError } from "../../slices/UserSlice";
import { AdminUpdateUserDetails, getUser } from "../../actions/AdminAction";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loder";

export default function AdminUpdateUser() {
    const { error, user, isAdminUpdateUser,loading } = useSelector((state) => state.userState);
    const { id: userId } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roles = ["user", "admin"];

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("role", role);
        dispatch(AdminUpdateUserDetails(userId, { name, email, role }));
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    useEffect(() => {
        dispatch(getUser(userId));
    }, [userId, dispatch]);

    useEffect(() => {
        if (isAdminUpdateUser) {
            toast("User updated successfully", {
                type: "success",
                position: "bottom-center",
                onOpen: () => {
                    dispatch(adminUpdateUserDetailClear());
                },
            });
            navigate(`/admin/users`);
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "error",
                onOpen: () => {
                    dispatch(clearError());
                },
            });
            return;
        }
    }, [isAdminUpdateUser, error, dispatch]);

    return (

        <div className="row">
        <div className="col-3 col-md-2">
                <Sidebar/>
        </div>
        <Fragment>
                {loading ? <Loader/> : 
                   <div className="row wrapper col-9"  style={{ marginTop: '0rem'}}>
            
                   <div  className="d-flex justify-content-center align-items-start col-12">
                       <form onSubmit={submitHandler} className="shadow-lg ">
                           <h1 className="mt-2 mb-5">Update User Details</h1>
       
                           <div className="form-group">
                               <label htmlFor="name_field">Name</label>
                               <input
                                   type="text"
                                   id="name_field"
                                   className="form-control"
                                   name="name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                               />
                           </div>
       
                           <div className="form-group">
                               <label htmlFor="email_field">Email</label>
                               <input
                                   type="email"
                                   id="email_field"
                                   className="form-control"
                                   name="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                               />
                           </div>
       
                           <div className="form-group">
                               <label htmlFor="role_field">Role</label>
                               <select
                                   value={role}
                                   onChange={(e) => setRole(e.target.value)}
                                   className="form-control"
                                   id="role_field"
                                   required
                               >
                                   <option value="">Select role</option>
                                   {roles.map((role) => (
                                       <option key={role} value={role}>
                                           {role}
                                       </option>
                                   ))}
                               </select>
                           </div>
       
                           <button type="submit" disabled={loading} className="btn update-btn btn-block mt-4 mb-3">
                               Update
                           </button>
                       </form>
                   </div>
               </div>
                }
            </Fragment>
        
        </div>
    );
}
