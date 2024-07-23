import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosInstance from '../Services/AxoisInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProduct() {
    const [title, setTitle] = useState('');
    const [product_description, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const handlePrice = (event) => setPrice(event.target.value);
    const handleTitle = (event) => setTitle(event.target.value);
    const handleProductDescription = (event) => setProductDescription(event.target.value);

    const handleBack = () => navigate('/');

    const updateHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await AxiosInstance.put(`update-product/${id}`, {
                product_title: title,
                product_description: product_description,
                product_price: price
            });
            toast.success('Product updated successfully!');
            navigate('/');
        } catch (error) {
            setError('Failed to update product. Please try again.');
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await AxiosInstance.get(`edit-product/${id}`);
                const productData = response.data.data || {};
                setTitle(productData.product_title || '');
                setProductDescription(productData.product_description || '');
                setPrice(productData.product_price || '');
            } catch (error) {
                setError('Failed to fetch product data.');
                toast.error('Failed to fetch product data.');
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Product</h5>
                        <button type="button" className="btn-close" onClick={handleBack} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <form onSubmit={updateHandler}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Product Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Enter product title"
                                    value={title}
                                    onChange={handleTitle}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Product Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    placeholder="Enter product price"
                                    value={price}
                                    onChange={handlePrice}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product_description" className="form-label">Product Description</label>
                                <textarea
                                    className="form-control"
                                    id="product_description"
                                    rows="3"
                                    placeholder="Enter product description"
                                    value={product_description}
                                    onChange={handleProductDescription}
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
