import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../Services/AxoisInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProduct() {
    const [title, setTitle] = useState('');
    const [product_description, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct();
    };

    const handlePrice = (event) => setPrice(event.target.value);
    const handleTitle = (event) => setTitle(event.target.value);
    const handleProductDescription = (event) => setProductDescription(event.target.value);

    const addProduct = async () => {
        setLoading(true);
        try {
            const response = await AxiosInstance.post('add-product', {
                product_title: title,
                product_description: product_description,
                product_price: price
            });
            setTitle('');
            setProductDescription('');
            setPrice('');
            toast.success(response.data.message);
            navigator('/');
        } catch (error) {
            console.log('error', error);
            toast.error('Failed to add product.');
        } finally {
            setLoading(false);
        }
    };

    const handleProductList = () => {
        navigator('/');
    };

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Product</h5>
                        <button type="button" onClick={handleProductList} className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Enter product title"
                                    value={title}
                                    onChange={handleTitle}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    placeholder="Enter product price"
                                    value={price}
                                    onChange={handlePrice}
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
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleProductList}>Back</button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            {' '}Saving...
                                        </>
                                    ) : (
                                        'Save'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
