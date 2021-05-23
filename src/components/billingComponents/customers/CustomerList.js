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
        <div>
            <input
                id="search-focus"
                type="search"
                id="form1"
                class="form-control"
                placeholder='search customers'
                value={search}
                onChange={handleSearch} />
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th></th>
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
                                                <td>{i + 1}</td>
                                                <td>{ele.name[0] + ele.name.slice(1)}</td>
                                                <td>{ele.mobile}</td>
                                                <td>{ele.email}</td>
                                                <td><button onClick={() => {
                                                    handleEdit(ele._id)
                                                }}>edit</button>
                                                    <button onClick={() => {
                                                        handleRemove(ele._id)
                                                    }}>remove</button>
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
    )
}

export default CustomerList