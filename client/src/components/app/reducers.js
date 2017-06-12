import { SET_USER, LOGGING_IN  } from './actions';

const initialState = { 
  currentUser: null,
  loading: false,
  statusCode: null,
}

export default (state=initialState, action) => {
    if(action.type === LOGGING_IN) {
        return {
            ...state,
            loading: action.loading
        }
    }
    if (action.type === SET_USER) {
        return {
            ...state,
            currentUser: action.currentUser,
            statusCode: action.statusCode,
            loading: action.loading,
        }
    }
    return state;
}