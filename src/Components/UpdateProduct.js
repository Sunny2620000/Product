import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import AxiosInstance from '../Services/AxoisInstance'
import { toast } from 'react-toastify';
export default function UpdateProduct(){
    const[title,setTitle] = useState('')
    const[product_description,setproduct_description] = useState('')
    const[price,setPrice] = useState('')
    const params = useParams();
    const productId = params.id ? params.id : 0
    const back = useNavigate()
    const handlePrice = (event)=>{
        setPrice(event.target.value)
    }
    const handleTitle = (event)=>{
        setTitle(event.target.value)
    }
    const handleproduct_description = (event)=>{
        setproduct_description(event.target.value)
    }

    const handleBack = ()=>{
        back('/')
    }
    const updateHandler = (event)=>{
        event.preventDefault()
         AxiosInstance.put(`update-product/${productId}`,{
                product_title:title,
                product_description:product_description,
                product_price:price
         }).then((response)=>{
            console.log("response",response)
            toast.success('Updated successfully!');
         }).catch((response)=>{
            console.log("Res",response)
            toast.error("something went wrong")
         })
    }
    useEffect(()=>{
        const result = async()=>{
            try{
                const response = await AxiosInstance.get(`edit-product/${productId}`)
                // console.log(response.data.data)
                const productdata = response && response.data && response.data.data ? response.data.data : []
                const productTitle = productdata.product_title ? productdata.product_title : ''
                const productDescription = productdata.product_description ? productdata.product_description : ''
                const productPrice = productdata.product_price ? productdata.product_price :'' 
                    setTitle(productTitle)
                    setproduct_description(productDescription)
                     setPrice(productPrice)
            }catch{
                console.log("error")
            }
        }
        result()
    },[productId])
    return(
        <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update New Product</h5>
                    {/* <button type="button" className="close" >
                        <span>&times;</span>
                    </button> */}
                    <button type="button" onClick={handleBack}className="btn btn-secondary" >
                        Back
                    </button>
                </div>
                <div className="modal-product_description">
                    {/* Add form elements here */}
                    <form onSubmit={updateHandler}>
                        <div className="form-group">
                            <label>Product Title</label>
                            <input type="text" className="form-control" placeholder="Enter title" name="title"onChange={handleTitle} value={title ? title :''}/>
                        </div>
                        <div className="form-group">
                            <label>Product Price</label>
                            <input type="text" className="form-control" placeholder="Enter title" name="price"onChange={handlePrice} value={price ? price :''}/>
                        </div>
                        <div className="form-group">
                            <label>Product Description</label>
                            <textarea className="form-control" rows="3" placeholder="Enter product_description" name="product_description" onChange={handleproduct_description}value={product_description ? product_description :''}></textarea>
                        </div>
                        <div className="modal-footer">
                    {/* <button type="button" className="btn btn-secondary" >Close</button> */}
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}