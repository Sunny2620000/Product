import axios from 'axios'
import React, { useState } from 'react'
import AxiosInstance from '../Services/AxoisInstance'

export default function CreateProduct(){
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [data,setData] = useState([])

    const handleSubmit = (event) =>{
        event.preventDefault()
        const newTitle = event.target.title.value
        const newBody = event.target.body.value
        setTitle(newTitle)
        setBody(newBody)
        addProduct(event);
        // const newData =[{title:newTitle,body:newBody}]
        // setData(newData)
    }
    const addProduct = (event)=>{
        AxiosInstance.post('posts',{
            title:title,
            body:body
        }).then((response)=>{
            console.log(response)
            event.target.reset()
            setTitle('');
            setBody('');
            setData([...data, { title: title, body: body }]);
        }).catch((error)=>{
            console.log('error')
        })
    }
    return(
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Product</h5>
                            <button type="button" className="close" >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Add form elements here */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" placeholder="Enter title" name="title" />
                                </div>
                                <div className="form-group">
                                    <label>Body</label>
                                    <textarea className="form-control" rows="3" placeholder="Enter body" name="body"></textarea>
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