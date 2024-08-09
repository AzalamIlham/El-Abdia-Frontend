import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Categorie = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:3000/auth/category/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setCategories(categories.filter((category) => category.id !== id));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const filteredCategories = categories.filter((category) =>
    category.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-between mb-3">
        <Link to="/dashboard/add_category" className="btn btn-success">
          Ajouter Nouvelle Catégorie
        </Link>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-3">
        {filteredCategories.length === 0 ? (
          <p>Aucune catégorie disponible.</p>
        ) : (
          <table className="table table-dark table-striped-columns">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.nom}</td>
                  <td>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="btn btn-danger"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Categorie;
