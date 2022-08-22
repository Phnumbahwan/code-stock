import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setCPassword] = useState('');

    const [ error, setError ] = useState(false);

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register',
                JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation
                }),
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                    }
                    
                }
            )

            // After register cleanup your mess
            setName('');
            setEmail('');
            setPassword('');
            setCPassword('');
            navigate("/login", { replace: true });
        } catch (e) {
            toast.error(e.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError(true);
        }
    }

    return (
        <div className='section'>
            <form className='form-register' onSubmit={registerSubmit}>
                <h3 className='text-center'>REGISTER FORM</h3>
                <div>
                    <label className='form-label'>Name</label>
                    <input className={error ? 'form-control error' : 'form-control'} type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} required></input>
                </div>
                <div>
                    <label className='form-label'>Email</label>
                    <input className={error ? 'form-control error' : 'form-control'} type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                </div>
                <div>
                    <label className='form-label'>Password</label>
                    <input className={error ? 'form-control error' : 'form-control'} type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
                </div>
                <div>
                    <label className='form-label'>Confirm password</label>
                    <input className={error ? 'form-control error' : 'form-control'} type="password" name="password" onChange={(e) => setCPassword(e.target.value)} value={password_confirmation} required></input>
                </div>
                <div className='submit-btn pt-3 text-center'>
                    <input className='btn btn-success' type="submit" value="Submit" />
                    <Link to={'/login'}>
                        <div className='btn btn-outline-primary btn-block mt-2'>Back</div>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register