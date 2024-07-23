import React, { useEffect, useState } from "react";
import AxiosInstance from "../Services/AxoisInstance";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListProduct.css';
import {toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

export default function ListProduct() {
    const [post, setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const result = async () => {
            try {
                const res = await AxiosInstance.get('products');
                const product = res && res.data && res.data.data ? res.data.data : [];
                setdata(product);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error('Error fetching products');
            }
        };
        result();
    }, []);

    const handleAddClick = () => {
        navigate('/add-product');
    };

    const deleteProducts = (id) => {
        AxiosInstance.delete(`delete-product/${id}`).then((response) => {
            setdata(post.filter(p => p.id !== id));
            toast.success('Product deleted successfully!');
        }).catch((error) => {
            console.log('error', error);
            toast.error('Failed to delete product.');
        });
    };

    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1>Product List</h1>
                    <button className="btn btn-primary" onClick={handleAddClick}>
                        <FaPlus /> ADD
                    </button>
                </div>
                {loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <table className="table table-hover table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Title</th>
                                <th scope="col">Product Description</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.length > 0 ? post.map((p, i) => (
                                <tr key={p.id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{p.product_title ? p.product_title : 'Test' }</td>
                                    <td>{p.product_description ? p.product_description : 'Test'}</td>
                                    <td>${p.product_price ? p.product_price : 0}</td>
                                    <td>
                                        <Link to={`edit-product/${p.id}`} className="btn btn-secondary btn-sm me-5">
                                            <FaEdit /> Edit
                                        </Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteProducts(p.id)}>
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No products available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
