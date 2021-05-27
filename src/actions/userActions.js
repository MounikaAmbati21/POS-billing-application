import axios from 'axios'
import swal from 'sweetalert'

export const startRegisterUser = (userData)=>{
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/users/register',userData)
            .then((response)=>{
                //console.log(response.data)
                if(response.data.hasOwnProperty('errors')){
                    swal(response.data.message)
                }else{
                swal('Successfully Registered')
                dispatch(setRegisterUser(response.data))
                }
            })
            .catch((err)=>{
                swal(err.message)
            })
    }
}

export const setRegisterUser=(data)=>{
    return {
        type: 'REGISTER_USER',
        payload: data
    }
}

export const startLoginUser = (userData)=>{
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/users/login',userData)
            .then((response)=>{
                //console.log(response.data)
                if(response.data.hasOwnProperty('errors')){
                    swal(response.data.message)
                }else{
                    localStorage.setItem('token',response.data.token)
                    dispatch(setLoginUser(response.data))
                }
            })
            .catch((err)=>{
                swal(err.message)
            })
    }
}

export const setLoginUser=(data)=>{
    return {
        type: 'LOGIN_USER',
        payload : data
    }
}

export const startGetUserDetails = ()=>{
    return (dispatch)=>{
        axios.get('https://dct-billing-app.herokuapp.com/api/users/account',{
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            //console.log(response.data)
            dispatch(setUserDetails(response.data))
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}
export const setUserDetails = (data)=>{
    return {
        type: 'GET_DETAILS',
        payload: data
    }
}