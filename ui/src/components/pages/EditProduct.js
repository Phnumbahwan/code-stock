import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import { useCookies } from 'react-cookie';

const EditProduct = () => {
    const [cookies] = useCookies(['user']);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const editProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/products/${state.id}`,
                {
                    name,
                    slug,
                    description,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                });
            // console.log(response.data);
            navigate("/", { replace: true });
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`/products/${state.id}`, {
                    headers: {
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                });
                setName(response.data.name);
                setSlug(response.data.slug);
                setDescription(response.data.description);
                setPrice(response.data.price);
            } catch (e) {
                console.log(e);
            }
        }
        getProduct();
    }, [])

    return (
        <div className='row'>
            <div className='col'>
                <div className="circle circ1"></div>
                <div className="circle circ2"></div>
                <div className="circle circ3"></div>
                <div className="circle circ4"></div>
            </div>
            <div className='section-add col-5 bg-white'>
                <form className='form-add' onSubmit={editProductSubmit}>
                    <h3>Edit Product</h3>
                    <div>
                        <label className='form-label'>Name</label>
                        <input className='form-control' type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} required></input>
                    </div>
                    <div>
                        <label className='form-label'>Slug</label>
                        <input className='form-control' type="slug" name="email" onChange={(e) => setSlug(e.target.value)} value={slug} required></input>
                    </div>
                    <div>
                        <label className='form-label'>Description</label>
                        <input className='form-control' type="text" name="password" onChange={(e) => setDescription(e.target.value)} value={description} required></input>
                    </div>
                    {/* <div>
                        <label className='form-label'>Price</label>
                        <input className='form-control' type="text" name="password" onChange={(e) => setPrice(e.target.value)} value={price} required></input>
                    </div> */}
                    <div className='submit-btn pt-3 text-center'>
                        <input className='btn btn-primary' type="submit" value="CONFIRM" />
                        <input className='btn btn-danger mt-1' type="submit" value="CANCEL" onClick={() => navigate(-1)} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProduct