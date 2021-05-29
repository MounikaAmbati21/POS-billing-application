import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startDeleteCustomer } from '../../../actions/billingActions'
import FilterResults from 'react-filter-search'

const CustomerList = (props) => {
    const { customers, handleEdit } = props
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleRemove = (id) => {
        //console.log(id)
        const confirm = window.confirm('Are you sure???')
        if (confirm) {
            dispatch(startDeleteCustomer(id))
        }
    }

    return (
        <div className="mb-6">
            <div className="row">
                <div className="col-md-4">
                    <h2 className="col-md-10">Total Customers - {customers.length}</h2>
                </div>
                <div className="col-md-4 mt-1 dark">
                    <input
                        id="search-focus"
                        type="search"
                        placeholder='search customers'
                        value={search}
                        onChange={handleSearch} />
                </div>
            </div>
            <div className="row ">
                            <div className="col-md-10 mt-3">
            <table className='table table-light table-hover'>
                <thead className='thead-dark'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <FilterResults
                        value={search}
                        data={customers}
                        renderResults={(results) => (
                            <>
                                {
                                    results.map((ele, i) => {
                                        return (
                                            <tr key={ele._id}>
                                                <td >{i + 1}</td>
                                                <td >{ele.name[0] + ele.name.slice(1)}</td>
                                                <td >{ele.mobile}</td>
                                                <td >{ele.email}</td>
                                                <td ><button onClick={() => {
                                                    handleEdit(ele._id)
                                                }} className="btn btn-primary btn-sm">edit</button>
                                                </td>
                                                <td >
                                                    <button onClick={() => {
                                                        handleRemove(ele._id)
                                                    }} className="btn btn-danger btn-sm">remove</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </>
                        )}
                    />
                </tbody>
            </table>
            </div>
            </div>
        </div>
    )
}

export default CustomerList