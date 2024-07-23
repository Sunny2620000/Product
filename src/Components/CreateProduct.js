import React, { useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import AxiosInstance from '../Services/AxoisInstance'
import { toast } from 'react-toastify';

export default function CreateProduct(){
    const [title,setTitle] = useState('')
    const [product_description,setproduct_description] = useState('')
    const [price,setPrice] = useState('')
    const [data,setData] = useState([])
    const navigator = useNavigate()
    const handleSubmit = (event) =>{
        event.preventDefault()
        addProduct(event);
    }

    const handlePrice = (event)=>{
        setPrice(event.target.value)
    }
    const handleTitle = (event)=>{
        setTitle(event.target.value)
    }
    const handleproduct_description = (event)=>{
        setproduct_description(event.target.value)
    }
    
    const addProduct = (event)=>{
        AxiosInstance.post('add-product',{
            product_title:title,
            product_description:product_description,
            product_price:price
        }).then((response)=>{
            event.target.reset()
            setTitle('');
            setproduct_description('');
            setPrice('')
            toast.success(response.data.data.message)
            //setData([...data, { title: title, product_description: product_description }]);
            console.log(response)
        }).catch((error)=>{
            console.log('error',error)
        })
    }
    const handleProductList=()=>{
        navigator('/')
    }
    return(
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Product</h5>
                            {/* <button type="button" className="close" >
                                <span>&times;</span>
                            </button> */}
                            <button type="button" onClick={handleProductList} className="btn btn-secondary" >
                                Back
                            </button>
                        </div>
                        <div className="modal-product_description">
                            {/* Add form elements here */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" placeholder="Enter title" name="title" onChange={handleTitle} />
                                </div>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" placeholder="Enter title" name="price" onChange={handlePrice} />
                                </div>
                                <div className="form-group">
                                    <label>product_description</label>
                                    <textarea className="form-control" rows="3" placeholder="Enter product_description" name="product_description"onChange={handleproduct_description}></textarea>
                                </div>
                                <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" >Close</button> */}
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}