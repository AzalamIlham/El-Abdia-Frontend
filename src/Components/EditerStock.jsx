import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditerStock = () => {
  const { id } = useParams();
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
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));

    
    axios.get('http://localhost:3000/auth/stock/' + id)
      .then(result => {
        if (result.data.Status) {
          const item = result.data.Result[0];
          setStock({
            nom: item.nom,
            numero_article: item.numero_article,
            prix_unitaire: item.prix_unitaire,
            quantite: item.quantite,
            prix_totale: item.prix_totale,
            date: item.date,
            category_id: item.category_id,
            description: item.description,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedStock = {
      ...stock,
      prix_totale: stock.prix_unitaire * stock.quantite
    };
    axios.put('http://localhost:3000/auth/editer_stock/' + id, updatedStock)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/stock');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Éditer Stock</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Nom Article"
              value={stock.nom}
              onChange={(e) => setStock({ ...stock, nom: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputNumeroArticle" className="form-label">
              Numéro d'Article
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputNumeroArticle"
              placeholder="Numéro Article"
              autoComplete="off"
              value={stock.numero_article}
              onChange={(e) => setStock({ ...stock, numero_article: e.target.value })}
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
              placeholder="Prix Unitaire"
              autoComplete="off"
              value={stock.prix_unitaire}
              onChange={(e) => setStock({ ...stock, prix_unitaire: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputQuantite" className="form-label">
              Quantité
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputQuantite"
              placeholder="Quantité"
              autoComplete="off"
              value={stock.quantite}
              onChange={(e) => setStock({ ...stock, quantite: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPrixTotale" className="form-label">
              Prix Total
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputPrixTotale"
              placeholder="Prix Total"
              autoComplete="off"
              value={stock.prix_unitaire * stock.quantite}
              readOnly
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputDate" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDate"
              value={stock.date}
              onChange={(e) => setStock({ ...stock, date: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Catégorie
            </label>
            <select
              id="category"
              className="form-select"
              value={stock.category_id}
              onChange={(e) => setStock({ ...stock, category_id: e.target.value })}
            >
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputDescription"
              placeholder="Description"
              value={stock.description}
              onChange={(e) => setStock({ ...stock, description: e.target.value })}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditerStock;
