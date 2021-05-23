const userIntialState = {}

const userReducer = (state=userIntialState,action)=>{
    switch(action.type){
        case 'REGISTER_USER' : {
            return {...action.payload}
        }
        case 'LOGIN_USER':{
            return {...action.payload}
        }
        case 'GET_DETAILS' : {
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default userReducer