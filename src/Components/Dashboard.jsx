import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./Dashboard.css"; 
const Dashboard = () => {
  const navigate = useNavigate(); 
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/adminlogin");
      }
    });
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
          <Link
            to="/dashboard"
            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-dark text-decoration-none"
          >
            <img
              src="/Images/image.png"
              width="160px"
              height="160px"
              alt="El Abdia Logo"
              className="logo"
            />
          </Link>
          <br />
          <br />
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="w-100">
              <Link
                to="/dashboard"
                className="nav-link text-dark px-0 align-middle "
              >
                <i className="fs-4 bi-speedometer2 ms-2"></i>
                <span className="ms-2 d-none d-sm-inline ">
                  Tableau de bord
                </span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/stock"
                className="nav-link px-0 align-middle text-dark"
              >
                <i className="fs-4 bi bi-box ms-2"></i>
                <span className="ms-2 d-none d-sm-inline">Stock</span>
              </Link>
            </li>

            <li className="w-100">
              <Link
                to="/dashboard/category"
                className="nav-link px-0 align-middle text-dark"
              >
                <i className="fs-4 bi-columns ms-2"></i>
                <span className="ms-2 d-none d-sm-inline">Catégorie</span>
              </Link>
            </li>

            <li className="w-100">
              <Link
                to="/dashboard/adminInfo"
                className="nav-link px-0 align-middle text-dark"
              >
                <i className="fs-4 bi bi-info-circle ms-2"></i>
                <span className="ms-2 d-none d-sm-inline">Utilisateur</span>
              </Link>
            </li>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <li className="w-100" onClick={handleLogout}>
              <Link className="nav-link px-0 align-middle text-dark">
                <i className="fs-4 bi-power ms-2"></i>
                <span className="ms-2 d-none d-sm-inline">
                  Se déconnecter
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="content">
        <div className="header p-2 d-flex justify-content-center shadow ">
          <h2>Gestion des Stocks</h2>
        </div>
        <div className="main-content p-3 mb-2 bg-primary text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
