import { Link } from "react-router-dom";
import { useCookies, Cookies } from 'react-cookie';
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaSearch } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';

const SearchComponent = ({ setSearchName, onSearch, setCheckbox, checkbox, userPage }) => {
    const [cookies] = useCookies(['user']);
    const navigate = useNavigate();
    const userCookie = new Cookies();

    const onLogout = async () => {
        try {
            const response = await axios.post('/logout',
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                });
            userCookie.remove('user');
            toast.error('User Logged out!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/login", { replace: true });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <nav className="navbar navbar-light bg-light px-3 py-3 border">
            <div className="d-flex">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(e) => setSearchName(e.target.value)} />
                    <div className="input-group-append">
                        <button onClick={() => onSearch()} className="btn btn-outline-info" type="button"><FaSearch /></button>
                    </div>
                </div>
            </div>
            <ul className="dropdown show remove-bullet d-flex">
                {
                    userPage ?
                        <>
                            <Link to={'/'}>
                                <div className='btn btn-primary w-nav'>View Products</div>
                            </Link>
                        </>
                        :
                        <>
                            {cookies?.user?.user.role == '0' ||
                                <Link to={'/add'}>
                                    <div className='btn btn-primary w-nav'>Add Product</div>
                                </Link>
                            }
                            {/* <div className={checkbox ? 'w-nav btn btn-outline-danger' : 'w-nav btn btn-danger'} onClick={() => setCheckbox(() => !checkbox)}>Delete</div> */}
                        </>
                }
                <Link to={'/users'}>
                    <div className={userPage ? 'btn btn-outline-info w-nav' : 'btn btn-info w-nav'}>All Users</div>
                </Link>
                <Link to={'/displaymap'}>
                    <div className='btn btn-map w-nav' >Get Location</div>
                </Link>
                <li className="nav-item dropdown">
                    <a className="w-nav dropdown-toggle btn btn-primary" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {cookies.user['user'].name || "No user"}
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" onClick={() => onLogout()}>Logout</a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default SearchComponent
