import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useCookies, Cookies } from 'react-cookie';
import SearchComponent from '../SearchComponent';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
    const [cookies] = useCookies(['user']);
    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('/users', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                });
                setUsers(response.data)
                console.log("running");
            } catch (e) {
                console.log(e);
            }
        }
        getUsers();
    }, [])

    const onSearch = async () => {
        var url = '';
        try {
            if (!searchName) {
                url = '/users';
            } else {
                url = `/users/search/${searchName}`;
            }
            const response = await axios.get(url,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                });
            if (response.data.length == 0) {
                toast.error('No User Found!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setUsers(response.data);
            navigate("/users", { replace: true });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <SearchComponent userPage={true} onSearch={onSearch} setSearchName={setSearchName} />
            <table className="table table-hover border-bottom">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(function (user, index) {
                            if (user.email != cookies.user['user'].email) {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role == 1 ? 'Admin' : 'User'}</td>
                                        <td className={user.is_active == '1' ? 'text-success' : 'text-danger'}>{user.is_active == '1' ? 'Online' : 'Offline'}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users