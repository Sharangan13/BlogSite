import { Fragment, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"; // Import Modal
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import Sidebar from "./Sidebar";
import { adminDeleteUserSuccess, clearError } from "../../slices/UsersSlice";
import { AdminDeleteUser, adminGetUsersDetails } from "../../actions/AdminAction";
import Loader from "../layouts/Loder";

export default function UserList() {
    const [show, setShow] = useState(false); // Modal visibility state
    const [userIdToDelete, setUserIdToDelete] = useState(null); // Store user ID to delete

    const truncateText = (text, charLimit) => {
        if (text.length > charLimit) {
            return text.slice(0, charLimit) + "...";
        }
        return text;
    };

    const { users = [], loading = true, error, isAdminDeleteUser } = useSelector(state => state.usersState);
    const dispatch = useDispatch();

    const setUsers = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', sort: 'asc' },
                { label: 'Name', field: 'name', sort: 'asc' },
                { label: 'Email', field: 'email', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' }
            ],
            rows: []
        };

        users.forEach(user => {
            if (user.role === "user") {
                data.rows.push({
                    id: user._id,
                    name: user.name,
                    email: truncateText(user.email, 25),
                    actions: (
                        <Fragment>
                            <Link to={`/admin/user/${user._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                            <Button onClick={() => handleShow(user._id)} className="btn btn-danger py-1 px-2 ml-2">
                                <i className="fa fa-trash"></i>
                            </Button>
                        </Fragment>
                    )
                });
            }
        });

        return data;
    };

    const handleShow = (id) => {
        setUserIdToDelete(id);
        setShow(true); // Show the modal
    };

    const handleClose = () => setShow(false); // Close the modal

    const confirmDelete = () => {
        dispatch(AdminDeleteUser(userIdToDelete)); // Dispatch delete action
        handleClose(); // Close the modal
    };

    useEffect(() => {
        if (error) {
            toast(error, {
                position: "bottom-center",
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        if (isAdminDeleteUser) {
            toast('User Deleted Successfully!', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(adminDeleteUserSuccess())
            });
        }

        dispatch(adminGetUsersDetails());
    }, [dispatch, error, isAdminDeleteUser]);

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Blogers List</h1>
                <Fragment>
                    {loading ? <Loader /> : 
                        <MDBDataTable
                            data={setUsers()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    }
                </Fragment>

               
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                        <IoClose onClick={handleClose}
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}/>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this Bloger?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
