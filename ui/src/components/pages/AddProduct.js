import React from 'react'
import { useState } from 'react'
import axios from '../../api/axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const addProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/products',
                JSON.stringify({name,slug,description,price,stripe_id:''}),
                {
                    headers: 
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.user.token}`

                    },
                },
            )
            console.log(response.data)
            navigate("/", { replace: true });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='row'>
            <div className='col'>
                <div className="circle circ1"></div>
                <div className="circle circ2"></div>
                <div className="circle circ3"></div>
                <div className="circle circ4"></div>
            </div>
            <div className='section-add col-5 bg-white'>
                <form className='form-add' onSubmit={addProductSubmit}>
                    <h3>Add Product</h3>
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
                    <div>
                        <label className='form-label'>Price</label>
                        <input className='form-control' type="text" name="password" onChange={(e) => setPrice(e.target.value)} value={price} required></input>
                    </div>
                    <div className='submit-btn pt-3 text-center'>
                        <input className='btn btn-primary' type="submit" value="CONFIRM" />
                        <input className='btn btn-danger mt-1' type="submit" value="CANCEL" onClick={() => navigate(-1)}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct