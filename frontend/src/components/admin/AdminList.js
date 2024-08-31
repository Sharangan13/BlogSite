import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { adminDeleteUserSuccess, clearError } from "../../slices/UsersSlice";

import {
  AdminDeleteUser,
  adminGetUsersDetails,
} from "../../actions/AdminAction";
import Loader from "../layouts/Loder";

export default function AdminList() {
  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  const {
    users = [],
    loading = true,
    error,
    isAdminDeleteUser,
  } = useSelector((state) => state.usersState);
  const { user: currentUser } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  const setAdmins = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      if (user.role === "admin") {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: truncateText(user.email, 25),

          actions: (
            <Fragment>
              {user._id !== currentUser._id && (
                <Link
                  to={`/admin/admin/${user._id}`}
                  className="btn btn-primary"
                >
                  <i className="fa fa-pencil"></i>
                </Link>
              )}{" "}
              <Button
                onClick={(e) => deleteHandler(e, user._id)}
                className="btn btn-danger py-1 px-2 ml-2"
                disabled={user._id === currentUser._id}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Fragment>
          ),
        });
      }
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(AdminDeleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isAdminDeleteUser) {
      toast("Admin Deleted Succesfully!", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(adminDeleteUserSuccess()),
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
        <h1 className="my-4">Admin List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setAdmins()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
