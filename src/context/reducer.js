import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, REGISTER_USER_BEGIN } from "./actions"

const reducer = (state, action) => {
  if(action.type === DISPLAY_ALERT)
  {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values',
    }
  }
  if(action.type === CLEAR_ALERT)
  {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }
  if(action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true}
  }
  if(action.type === REGISTER_USER_SUCCESS) {
    return { 
      ...state, 
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: "User created! Redirecting user...",
    }
  }
  if(action.type === REGISTER_USER_ERROR) {
    return { 
      ...state, 
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
    }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default reducer