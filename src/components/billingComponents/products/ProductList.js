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
        <div>
            {products.length===0? (
                <h2>No Products Added</h2>
            ) : (
                <div>
                    <h2>List of Products</h2>
                    <input  type="search" 
                            placeholder='search products' 
                            value={search}
                            onChange={handleSearch}/>
                    <table>
                        <thead>
                            <tr>
                                <th>sl.no</th>
                                <th>name</th>
                                <th>price</th>
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
                                                <td>{i+1}</td>
                                                <td>{data.name[0].toUpperCase()+data.name.slice(1)}</td>
                                                <td>{data.price}</td>
                                                <td><button onClick={()=>{
                                                    handleEdit(data._id)
                                                    }} >edit</button></td>
                                                <td><button 
                                                    onClick={()=>{
                                                    handleProductRemove(data._id)
                                                    }}
                                                    >delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </>
                            )}
                        />
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ProductsList