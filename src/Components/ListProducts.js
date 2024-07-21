import React, { useEffect, useState } from "react";
import axios from "../Services/AxoisInstance";
export default function ListProduct() {
    const [post,setdata] = useState([])

    useEffect(()=>{
        const result = async ()=>{
            try{
                const res = await axios.get('posts').then((response)=>{
                    console.log("response",response)
                    const product = response && response.data ? response.data : []
                    setdata(product)
                }).catch((error)=>{console.log("error",error)})
            }catch{
                console.log("error")
            }
        }
        result()
    },[])
    const tenProduct = post.slice(0,10);
  return (
    <table className="table table-success table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
       { tenProduct.map((p,i)=>{
            return(
                <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{p.title}</td>
                <td>{p.body}</td>
                <td>test</td>
              </tr>
            )
       })}
      </tbody>
    </table>
  );
}
