import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/signup', values)
            .then(result => {
                if (result.data.signupStatus) {
                    navigate('/adminlogin'); 
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Nom d'utilisateur:</strong></label>
                        <input type="text" name='username' autoComplete='off' placeholder='Nom d utilisateur'
                         onChange={(e) => setValues({...values, username: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" name='email' autoComplete='off' placeholder='Mon email'
                         onChange={(e) => setValues({...values, email: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'> 
                        <label htmlFor="password"><strong>Mot de passe:</strong></label>
                        <input type="password" name='password' placeholder='Mot de passe'
                         onChange={(e) => setValues({...values, password: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <button className='btn btn-primary w-100 rounded-0 mb-2'>S'inscrire</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
