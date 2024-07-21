import React, { useEffect, useState } from "react";
import axios from "../Services/AxoisInstance";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListProduct.css';
import { useNavigate } from "react-router-dom";

export default function ListProduct() {
    const [post, setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const result = async () => {
            try {
                const res = await axios.get('posts');
                // console.log("response", res);
                const product = res && res.data ? res.data : [];
                setdata(product);
                setLoading(false);
            } catch (error) {
                console.log("error", error);
                setLoading(false);
            }
        };
        result();
    }, []);
    const handleAddClick = ()=>{
      alert('dfsf')
      navigate('/add-product')
    }
    const tenProduct = post.slice(0, 10);

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
                                <th scope="col">Title</th>
                                <th scope="col">Body</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenProduct.map((p, i) => (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{p.title}</td>
                                    <td>{p.body}</td>
                                    <td>@handle</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            
        </>
    );
}
