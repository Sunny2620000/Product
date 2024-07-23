import React, { useEffect, useState } from "react";
import axios from "../Services/AxoisInstance";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListProduct.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AxiosInstance from "../Services/AxoisInstance";


export default function ListProduct() {
    const [post, setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const result = async () => {
            try {
                const res = await axios.get('products');
                //  console.log("response", res.data);
                 const product = res && res.data && res.data.data ? res.data.data : [];
                //  const product = res && res.data && res.data ? res.data : [];
                    setdata(product);
                    setLoading(false);
                // toast.success('Product fetch successfully!');

            } catch (error) {
                // console.log("error", error);
                setLoading(false);
            }
        };
        result();
    }, []);
    const handleAddClick = ()=>{
      navigate('/add-product')
    }
    const deleteProducts = (id)=>{
            AxiosInstance.delete(`delete-product/${id}`).then((response)=>{
                console.log(response)
                setdata(response.data)
        toast.success('Product deleted successfully!');
            }).catch((error)=>{
                console.log('error',error)
            })  
    }

    // const tenProduct = post.slice(0, 10);

    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-3" onClick={handleAddClick}>ADD</button>
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
                            {post.length > 0 && post.map((p, i) => (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{p.product_title ? p.product_title : 'Test' }</td>
                                    <td>{p.product_description ? p.product_description : 'Test'}</td>
                                    <td>${' '}{p.product_price ? p.product_price :0}</td>
                                    <td>
                                        <Link to={`edit-product/${p.id}`} className="btn btn-secondary">edit</Link>
                                        <button className="btn btn-danger"to="#" onClick={()=>deleteProducts(p.id)}>delete</button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            
        </>
    );
}
