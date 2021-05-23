import axios from 'axios'
import swal from 'sweetalert'

// to add customer
export const startAddCustomer = (data) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/customers', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const userData = response.data
                if (userData.hasOwnProperty('errors')) {
                    swal(userData.message)
                } else {
                    swal('Customer added Successfully')
                    dispatch(addCustomer(userData))
                }
            })
            .catch((err) => {
                swal(err.message)
            })
    }
}

export const addCustomer = (userData) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: userData
    }
}
// to get all customers
export const startGetAllCustomers = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/customers', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const userData = response.data
                if (userData.hasOwnProperty('errors')) {
                    swal(userData.message)
                } else {
                    dispatch(getCustomers(userData))
                }
            })
    }
}
export const getCustomers = (data) => {
    return {
        type: 'GET_CUSTOMERS',
        payload: data
    }
}
// to get single customer
export const startGetOneCustomer = (id) => {
    return (dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const userData = response.data
                if (userData.hasOwnProperty('errors')) {
                    swal(userData.message)
                } else {
                    dispatch(getOneCustomer(userData))
                }
            })
            .catch((err) => {
                swal(err.message)
            })
    }
}
export const getOneCustomer = (data) => {
    return {
        type: 'GET_ONE_CUSTOMER',
        payload: data
    }
}
// update customer details
export const startUpdateCustomer = (id, data) => {
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const userData = response.data
                if (userData.hasOwnProperty('errors')) {
                    swal(userData.message)
                } else {
                    dispatch(editCustomer(userData))
                }
            })
            .catch((err) => {
                swal(err.message)
            })
    }
}
export const editCustomer=(editResult)=>{
    return{
        type : 'EDIT_CUSTOMER',
        payload : editResult
    }
}

// to delete customer
export const startDeleteCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const userData = response.data
                if (userData.hasOwnProperty('errors')) {
                    swal(userData.message)
                } else {
                    //console.log(userData)
                    dispatch(deleteCustomer(userData))
                }
            })
            .catch((err) => {
                swal(err.message)
            })
    }
}
export const deleteCustomer = (userData) => {
    return {
        type: 'DELETE_CUSTOMER',
        payload: userData
    }
}

export const clearCustomerData = ()=>{
    return {
        type: 'CLEAR_CUST_DATA'
    }
}

// to add product
export const startAddProductData = (data) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/products', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors')) {
                    swal(response.data.message)
                } else {
                    swal('New product added to the list')
                    dispatch(addProduct(response.data))
                }
            })
            .catch((err) => {
                swal(err.meesage)
            })
    }
}
export const addProduct = (data) => {
    return {
        type: 'ADD_PRODUCT',
        payload: data
    }
}
// to update product
export const startUpdateProductData = (id, data) => {
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors')) {
                    swal(response.data.message)
                } else {
                    swal('product details updated')
                    dispatch(editProduct(response.data))
                }
            })
            .catch((err) => {
                swal(err.meesage)
            })
    }
}
export const editProduct=(data)=>{
    return {
        type : 'EDIT_PRODUCT',
        payload : data
    }
}

// to get single product data
export const startGetProductData = (id) => {
    return (dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors')) {
                    swal(response.data.message)
                } else {
                    dispatch(setProduct(response.data))
                }
            })
            .catch((err) => {
                swal(err.meesage)
            })
    }
}

export const setProduct = (data) => {
    return {
        type: 'GET_SINGLE_PRODUCT',
        payload: data
    }
}
// to delete product
export const startDeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors')) {
                    swal(response.data.message)
                } else {
                    dispatch(deleteProduct(response.data))
                }
            })
            .catch((err) => {
                swal(err.meesage)
            })
    }
}
export const deleteProduct = (data) => {
    return {
        type: 'DALETE_PRODUCT',
        payload: data
    }
}
// to get all products
export const startGetAllProducts = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/products', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors')) {
                    swal(response.data.message)
                } else {
                    dispatch(getProducts(response.data))
                }
            })
            .catch((err) => {
                swal(err.meesage)
            })
    }
}
export const getProducts = (data) => {
    return {
        type: 'GET_ALL_PRODUCTS',
        payload: data
    }
}
export const clearProductData = ()=>{
    return {
        type: 'CLEAR_PRODUCT_DATA'
    }
}
// to add bill
export const startCreateBill = (data) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/bills', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const billdata = response.data
                if (billdata.hasOwnProperty('errors')) {
                    swal(billdata.message)
                } else {
                    dispatch(addBill(billdata))
                }
            })
            .catch((err) => {
                swal(err.message)
            })
    }
}

export const addBill = (data) => {
    return {
        type: 'ADD_BILL',
        payload: data
    }
}
// to get all bills
export const startGetAllBills = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/bills', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const billdata = response.data
                if (billdata.hasOwnProperty('errors')) {
                    swal(billdata.message)
                } else {
                    dispatch(getBills(billdata))
                }
            })
            .catch((err) => {
                swal(err.message)
            })
    }
}

export const getBills = (data) => {
    return {
        type: 'GET_ALL_BILLS',
        payload: data
    }
}
// to get single bill
export const startGetSingleBill = (id) => {
    return (dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const billdata = response.data
                if (billdata.hasOwnProperty('errors')) {
                    swal(billdata.message)
                } else {
                    dispatch(setSingleBill(billdata))
                }
            })
            .catch((err) => {
                swal(err.message)
            })
    }
}

export const setSingleBill = (data) => {
    return {
        type: 'GET_SINGLE_BILL',
        payload: data
    }
}
// to delete bill
export const startDeleteBill = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const billdata = response.data
                if (billdata.hasOwnProperty('errors')) {
                    swal(billdata.message)
                } else {
                    dispatch(setDeleteBill(billdata))
                }
            })
            .catch((err) => {
                swal(err.message)
            })
    }
}

export const setDeleteBill = (data) => {
    return {
        type: 'DELETE_BILL',
        payload: data
    }
}


//Bill Customer Data

export const billCustomerData = (data) => {
    return {
        type: 'BILL_CUSTOMER_DATA',
        payload: data
    }
}
export const getBillCustomerData = () => {
    return {
        type: 'GET_BILLS_CUSTOMER_DATA'
    }
}

export const clearBillCustomerData = () => {
    return {
        type: 'CLEAR_BILL_CUSTOMER_DATA'
    }
}

// Add to Cart

export const addToCart = (data) => {
    return {
        type: 'ADD_TO_CART',
        payload: data
    }
}

export const getCartItems = () => {
    return {
        type: 'GET_CART_ITEMS'
    }
}

export const removeCartData = (id) => {
    return {
        type: 'REMOVE_CART_DATA',
        payload: id
    }
}

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}