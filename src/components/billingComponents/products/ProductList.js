import React,{useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { startGetAllProducts, startDeleteProduct } from '../../../actions/billingActions'
import FilterResults from 'react-filter-search'

const ProductsList = (props)=>{
    const {handleEdit} = props
    const [search,setSearch]=useState('')
    const dispatch=useDispatch()

    const products = useSelector((state)=>{
        return state.details.products
    })
    useEffect(()=>{
        dispatch(startGetAllProducts())
    },[])

    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }

    const handleProductRemove=(id)=>{
        const confirm=window.confirm('Are ypu sure?')
            if(confirm){
               dispatch(startDeleteProduct(id))
            }
    }

    return (
        <div className="mb-3">
            {products.length===0? (
                <h2>No Products Added</h2>
            ) : (
                <div className="mb-6">
                    <div className="row">
                    <div className="col-md-3 mb-3">
                    <h2>List of Products</h2>
                    </div>
                    <div className="col-md-6 mt-2 dark">
                    <input  type="search" 
                            placeholder='search products' 
                            value={search}
                            onChange={handleSearch}/>
                            </div>
                            </div>
                            <div className="row ">
                            <div className="col-md-10">
                    <table className='table table-light table-hover'>
                        <thead className='thead-dark'> 
                            <tr>
                                <th scope="col">Sl.No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        <FilterResults 
                            value={search}
                            data={products}
                            renderResults={(results)=>(
                                <>
                                    {results.map((data,i)=>(
                                            <tr key={data._id} >
                                                <td >{i+1}</td>
                                                <td >{data.name[0].toUpperCase()+data.name.slice(1)}</td>
                                                <td >{data.price}</td>
                                                <td ><button onClick={()=>{
                                                    handleEdit(data._id)
                                                    }} className="btn btn-primary btn-sm"
                                                    >edit</button></td>
                                                <td ><button 
                                                    onClick={()=>{
                                                    handleProductRemove(data._id)
                                                    }}
                                                    className="btn btn-danger btn-sm"
                                                    >remove</button></td>
                                            </tr>
                                        ))
                                    }
                                </>
                            )}
                        />
                        </tbody>
                    </table>
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductsList