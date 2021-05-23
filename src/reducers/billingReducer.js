const intialState = {
    customers : [],
    singleCustomer : {},
    singleProduct:{},
    products : [],
    bills : [],
    billCustomerData:{},
    cart:[],
    singleBill:{}
}

const billingReducer = (state=intialState,action)=>{
    switch(action.type){

        case 'ADD_CUSTOMER' : {
            return {...state , customers : [...state.customers, action.payload]}
        }
        case 'GET_ONE_CUSTOMER' : {
            return {...state, singleCustomer : {...action.payload}}
        }
        case  'GET_CUSTOMERS' : {
            return {...state, customers: [...action.payload]}
        }
        case 'EDIT_CUSTOMER' :{
            return {
                ...state,
                customers : state.customers.map((ele)=>{
                    if(ele._id===action.payload._id){
                        return { ...ele, ...action.payload }
                    }else{
                        return {...ele}
                    }
                })
            }
        }
        case 'CLEAR_CUST_DATA' : {
            return {...state,singleCustomer : {} } 
        }
        case 'DELETE_CUSTOMER' : {
            const filterCustomers =  state.customers.filter((ele)=>{
                return ele._id !== action.payload._id
            })
            return {...state , customers : filterCustomers}
        }
        case 'ADD_PRODUCT' : {
            return {...state, products: [...state.products, action.payload]}
        }
        case 'GET_ALL_PRODUCTS' : {
            return {...state , products: [...action.payload]}
        }
        case 'GET_SINGLE_PRODUCT': {
            return {...state, singleProduct:{...action.payload}}
        }

        case 'DALETE_PRODUCT': {
            const filrterProducts = state.products.filter((ele)=>{
                return ele._id !== action.payload._id
            })
            return {...state, products : filrterProducts}
        }
        case 'CLEAR_PRODUCT_DATA' : {
            return {...state, singleProduct : {} }
        }
        case 'EDIT_PRODUCT' :{
            return{
                ...state,
                products : state.products.map((ele)=>{
                    if(ele._id===action.payload._id){
                    return { ...ele , ...action.payload }
                    }else{
                        return {...ele}
                    }
                })
            }
        }
        // Bills
        case 'ADD_BILL': {
            return {...state, bills : [...state.bills, action.payload]}
        }
        case 'GET_ALL_BILLS': {
            return {...state, bills : [...action.payload]}
        }
        case 'GET_SINGLE_BILL' : {
            return {...state, singleBill : {...action.payload}}
        }
        case 'DELETE_BILL':{
            const filetrBills = state.bills.filter((ele)=>{
                return ele._id !== action.payload._id
            })
            return {...state, bills : filetrBills}
        }
// bill customer data
        case 'BILL_CUSTOMER_DATA' :{
            return {...state , billCustomerData: {...action.payload} } 
        }

        case 'GET_BILLS_CUSTOMER_DATA' : {
            return {...state, billCustomerData : {...action.payload} }
        }

        case 'CLEAR_BILL_CUSTOMER_DATA' :{
            return {...state , billCustomerData :{} }
        }
// For Cart Items
        case 'ADD_TO_CART' : {
            return {...state, cart: [...state.cart, action.payload]}
        }
        
        case 'GET_CART_ITEMS' :{
            return {...state , cart : [...state.cart] }
        }

        case 'REMOVE_CART_DATA' : {
            return {
                ...state,
                cart : state.cart.filter((ele)=>{
                    return ele.products._id !== action.payload
                })
            }
        }
        case 'CLEAR_CART' :{
            return {...state, cart : [] }
        }

        default : {
            return {...state}
        }
    }
}

export default billingReducer