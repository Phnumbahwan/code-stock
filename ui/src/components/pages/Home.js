import { useEffect, useState } from 'react'
import SearchComponent from '../SearchComponent'
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useCookies, Cookies } from 'react-cookie';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loadStripe } from '@stripe/stripe-js'

const Home = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const [products, setProducts] = useState([]);
    const [checkbox, setCheckbox] = useState(false);
    const [check, setCheck] = useState();
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState('');
    const [stripeProduct, setStripeProduct] = useState('');
    // const userCookie = new Cookies();

    let stripeTestPromise;

    const getStripe = () => {
        if (!stripeTestPromise) {
            stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
        }

        return stripeTestPromise;
    }

    const checkoutOptions = {
        lineItems: [{
            price: stripeProduct,
            quantity: 1,
        }],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    }

    const setCheckout = (id) => {
        setStripeProduct(id);
    }

    useEffect(() => {
        const redirectToCheckout = async () => {
            try {
                const stripe = await getStripe();
                const { error } = await stripe.redirectToCheckout(checkoutOptions);
                console.log("Stripe checkout error", error);
            } catch (e) {
                console.log(e);
            }
        };
        redirectToCheckout();
    }, [stripeProduct])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('/products', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                });
                setProducts(response.data)
            } catch (e) {
                console.log(e);
            }
        }
        getProducts();
    }, [])

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`/products/${id}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                });
            if (response.data.message == 'You need to be admin to enable action.') {
                toast.error('You need to be admin to enable action!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Product Deleted!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const newProducts = products.filter((product) => product.id != id)
                setProducts(newProducts);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onUpdate = (productId) => {
        if (cookies.user.user.role == '0') {
            toast.error('You need to be admin to enable action!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            navigate('/edit', { state: { id: productId } });
        }
    }

    const onSearch = async () => {
        var url = '';
        try {
            if (!searchName) {
                url = '/products';
            } else {
                url = `/products/search/${searchName}`;
            }
            const response = await axios.get(url,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                });
            if (response.data.length == 0) {
                toast.error('No Product Found!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setProducts(response.data);
            navigate("/", { replace: true });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <SearchComponent onSearch={onSearch} setSearchName={setSearchName} setCheckbox={setCheckbox} checkbox={checkbox} />
            <table className="table table-hover border-bottom">
                <thead>
                    <tr>
                        {checkbox && <th>
                            <div className="form-check">
                                <input className="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..." />
                            </div>
                        </th>}
                        {/* <th scope="col">#</th> */}
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th className='text-center' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) =>
                            <tr key={index}>
                                {checkbox && <th>
                                    <div className="form-check">
                                        <input className="form-check-input position-static" type="checkbox" id="blankCheckbox" onClick={(e) => console.log(e.target.checked)} onChange={(e) => setCheck(e.target.checked)} value={true} aria-label="..." />
                                    </div>
                                </th>}
                                {/* <th scope="row">{index + 1}</th> */}
                                <th>{product.id}</th>
                                <td>{product.name}</td>
                                <td>{product.slug}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td className='text-center'>
                                    <div className={cookies?.user?.user.role == '0' ? 'btn btn-danger disabled' : 'btn btn-danger'} onClick={() => deleteProduct(product.id)}>
                                        DELETE
                                    </div>
                                    <div className={cookies?.user?.user.role == '0' ? 'btn btn-primary mx-2 disabled' : 'btn btn-primary mx-2'} onClick={() => onUpdate(product.id)}>
                                        UPDATE
                                    </div>
                                    <div onClick={() => setCheckout(product.price_id)} className='btn btn-success'>
                                        CHECKOUT
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {/* <div className='text-right'>
                <FaAngleLeft className='prev-icon arrow-btn' />
                <FaAngleRight className='next-icon arrow-btn' />
            </div> */}
        </div>
    )
}

export default Home

