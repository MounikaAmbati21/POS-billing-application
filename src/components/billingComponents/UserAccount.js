import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {startGetUserDetails} from '../../actions/userActions'

const UserAccount =(props)=>{
    const dispatch = useDispatch()

    const userData = useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        dispatch(startGetUserDetails())
    },[])

    return (
        <div>
            <h2>Profile</h2>
            <p>Name - {userData.username}</p>
            <p>Email - {userData.email}</p>
            <p>Business Name - {userData.businessName}</p>
            <p>Address - {userData.address} </p>
        </div>
    )
}

export default UserAccount