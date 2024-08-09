import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'

const AddStock = () => {
  const [stock, setStock] = useState({
    nom: "",
    numero_article: "",
    prix_unitaire: "",
    quantite: "",
    prix_totale: "",
    date: "",
    category_id: "",
    description: "",
  });
  const [categorie, setCategorie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategorie(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedStock = { ...stock, [name]: value };

    if (name === "prix_unitaire" || name === "quantite") {
      const prixUnitaire = parseFloat(updatedStock.prix_unitaire || 0);
      const quantite = parseInt(updatedStock.quantite || 0);
      updatedStock.prix_totale = prixUnitaire * quantite;
    }

    setStock(updatedStock);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(stock).forEach((key) => formData.append(key, stock[key]));

    axios
      .post("http://localhost:3000/auth/add_stock", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/stock");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border information">
        <h3 className="text-center">Information Article</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Nom de Produit :
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Nom article"
              name="nom"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputNumeroArticle" className="form-label">
              Numero d'Article :
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputNumeroArticle"
              placeholder="numero article"
              name="numero_article"
              autoComplete="off"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPrixUnitaire" className="form-label">
              Prix Unitaire
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputPrixUnitaire"
              placeholder="Prix Article"
              name="prix_unitaire"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputQuantite" className="form-label">
              Quantité :
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputQuantite"
              placeholder="Quantité"
              name="quantite"
              autoComplete="off"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPrixTotale" className="form-label">
              Prix Total :
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPrixTotale"
              placeholder="Prix Total"
              value={stock.prix_totale}
              readOnly
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputDate" className="form-label">
              Date :
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDate"
              name="date"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Catégorie Produit :
            </label>
            <select
              name="category_id"
              id="category"
              className="form-select"
              onChange={handleInputChange}
            >
              {categorie.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">
              Description Produit :
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputDescription"
              placeholder="Description Article"
              name="description"
              autoComplete="off"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="bg-success text-white w-100">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStock;



