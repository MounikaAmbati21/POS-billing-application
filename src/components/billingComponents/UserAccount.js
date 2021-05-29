import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetUserDetails } from '../../actions/userActions'

const UserAccount = (props) => {
    const dispatch = useDispatch()

    const userData = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        dispatch(startGetUserDetails())
    }, [])

    return (
        <div className="col-md-6 mt-5">
            <div classNameName="card ">
                <div className="card-header ">
                    <h3>Profile</h3>
                    <div className="card-body">
                        <h5 className="card-title col-md-6">Name - {userData.username}</h5>
                        <h5 className="card-text col-md-8">Email - {userData.email}</h5>
                        <h5 className="card-text col-md-10">Business Name - {userData.businessName}</h5>
                        <h5 className="card-text col-md-6">Address - {userData.address} </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAccount