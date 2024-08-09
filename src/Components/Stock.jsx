import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExportPDF from './ExportPDF'; 
import ExportExcel from './ExportExcel'; 
import ExportStock from "./ExportStock";

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [exportOption, setExportOption] = useState("none");

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/stock")
      .then((result) => {
        if (result.data.Status) {
          setStock(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_stock/' + id)
      .then(result => {
        if (result.data.Status) {
          setStock(stock.filter(item => item.id !== id));
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }

  const filteredStock = stock.filter(item =>
    item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.numero_article.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-between mb-3">
        <Link to="/dashboard/add_stock" className="btn btn-success">
          Ajouter Nouvelle Article
        </Link>
        <div>
          <select
            className="form-select"
            value={exportOption}
            onChange={(e) => setExportOption(e.target.value)}
          >
            <option value="none">Choisir un format d'exportation</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
          {exportOption === 'csv' && <ExportStock stock={stock} />}
          {exportOption === 'pdf' && <ExportPDF stock={stock} />}
          {exportOption === 'excel' && <ExportExcel stock={stock} />}
        </div>

        <input
          type="text"
          placeholder="Rechercher..."
          className="form-control w-25"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br/>
      <br/>

      <div className="mt-3">
        {filteredStock.length === 0 ? (
          <p>Aucune article disponible.</p>
        ) : (
          <table className="table table-dark table-striped-columns">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Numero Article</th>
                <th>Prix Unitaire</th>
                <th>Quantité</th>
                <th>Prix Totale</th>
                <th>Date</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map((item) => (
                <tr key={item.id}>
                  <td>{item.nom}</td>
                  <td>{item.numero_article}</td>
                  <td>{item.prix_unitaire}</td>
                  <td>{item.quantite}</td>
                  <td>{item.prix_totale}</td>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                  <td>
                    <Link
                      to={`/dashboard/editer_stock/` + item.id}
                      className="btn btn-info btn-sm me-2"
                    >
                      Éditer
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(item.id)}
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

export default Stock;
