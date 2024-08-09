import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

const AddCategorie = () => {
  const [categorie, setCategorie] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!categorie) {
      setError('Le nom de la catégorie est requis.');
      return;
    }

    setIsSubmitting(true);

    axios.post('http://localhost:3000/auth/add_category', { categorie })
      .then(result => {
        setIsSubmitting(false);
        if (result.data.Status) {
          navigate('/dashboard/category');
        } else {
          setError(result.data.Error || 'Une erreur est survenue.');
        }
      })
      .catch(err => {
        setIsSubmitting(false);
        setError('Une erreur est survenue. Veuillez réessayer.');
        console.log(err);
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
      <div className='p-3 rounded w-40 border information'>
        <h2>Information Catégorie</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="category"><strong>Nom Catégorie:</strong></label>
            <input
              type="text"
              name='categorie'
              placeholder='Categorie Article'
              onChange={(e) => setCategorie(e.target.value)}
              className='form-control rounded-0'
              value={categorie}
              disabled={isSubmitting}
            />
          </div>
          {error && <div className='text-danger mb-2'>{error}</div>}
          <button
            className='btn btn-success w-100 rounded-0 mb-2'
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategorie;
