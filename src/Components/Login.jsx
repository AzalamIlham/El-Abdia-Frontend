import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                navigate('/dashboard')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    const handleSignUp = () => {
        navigate('/signup') 
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" name='email' autoComplete='off' placeholder='Mon email'
                         onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'> 
                        <label htmlFor="password"><strong>Mot de passe:</strong></label>
                        <input type="password" name='password' placeholder='Mon mot de passe'
                         onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Se connecter</button>
                </form>
                <button className='btn btn-primary w-100 rounded-0' onClick={handleSignUp}>S'inscrire</button>
            </div>
        </div>
    )
}

export default Login
