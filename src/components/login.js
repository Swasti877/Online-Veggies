import React, { useState } from "react";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";

export default function Login() {
    const [cred, setCred] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(cred.email, cred.password)
            .then(auth => {
                navigate('/')
            }).catch(error => {
                alert(error.message)
            })
    }
    const createAccount = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(cred.email, cred.password)
            .then((auth) => {
                console.log(auth)
                if (auth) {
                    navigate('/')
                }
            })
            .catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <Link to='/'>
                <h2 className="login__title">Online Veggies</h2>
            </Link>
            <div className="login__container">
                <form>
                    <h1>Sign In</h1>
                    <label htmlFor='login__email'>E-mail</label>
                    <input type='text' id='login__email' value={cred.email} name="email" onChange={onChange} />

                    <label htmlFor='login__password'>Password</label>
                    <input type='password' id='login__password' value={cred.password} onChange={onChange} name="password" />
                    <button type='submit' onClick={signIn} className="login__signinButton">SignIn</button>
                </form>
                <p>
                    By continuing, you agree to Online Veggie's Conditions of Use and Privacy Notice.
                </p>
                <button className="login__signup" onClick={createAccount}>Create Account</button>
            </div>

        </div>
    )
}