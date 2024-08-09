import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import './style.css';


const AdminInfo = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdminRecords();
  }, []);

  const fetchAdminRecords = () => {
    axios.get("http://localhost:3000/auth/admin_records")
      .then((result) => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des administrateurs:', error);
        alert('Une erreur s\'est produite lors de la récupération des administrateurs.');
      });
  };

  const deleteAdmin = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_admin/${id}`)
      .then(result => {
        if (result.data.Status) {
          setAdmins(admins.filter(admin => admin.id !== id));
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'administrateur:', error);
        alert('Une erreur s\'est produite lors de la suppression de l\'administrateur.');
      });
  };

  return (
    <div className="mt-4 px-5 pt-3">
      <h3>Administrateurs connectés</h3>
      <div className="row">
        {admins.map((admin) => (
          <div className="col-md-4" key={admin.id}>
            <div className="card mb-4 ">
              <div className="card-body bg-success text-white">
                <div className="d-flex align-items-center mb-3">
                  <FaUser size={32} className="me-3" />
                  <h5 className="card-title mb-0">{admin.email}</h5>
                </div>
                <button 
                  className="btn btn-danger"
                  onClick={() => deleteAdmin(admin.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInfo;
