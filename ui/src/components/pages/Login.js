import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['user']);

    const [error, setError] = useState(false);

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login',
                JSON.stringify({ email, password }),
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                    },
                },
            );
            toast.success('Login Success!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const user = response?.data;
            setCookie('user', user);
            navigate(from, { replace: true, state: { loginSuccess: true } });
        } catch (err) {
            if (err?.response) {
                toast.error('No User Found!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setError(true);
            } else if (err.reponse?.status === 400) {
                toast.error('Missing Email or Password!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (err.response?.status === 401) {
                toast.error('Unauthorized!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Error!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    return (
        <div className='section'>
            <form className='form-login' onSubmit={loginSubmit}>
                <h3 className='text-center'>LOGIN FORM</h3>
                <div>
                    <label className='form-label'>Email</label>
                    <input className={error ? 'form-control error' : 'form-control'} type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                </div>
                <div>
                    <label className='form-label'>Password</label>
                    <input className={error ? 'form-control error' : 'form-control'} type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
                </div>
                <div className='submit-btn pt-3 text-center'>
                    <input className='btn btn-primary' type="submit" value="Submit" />
                </div>
                <div className='login-to-register-text'>
                    <p>No user account yet?
                        <Link to={'/register'}>
                            <span>Register</span>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login
