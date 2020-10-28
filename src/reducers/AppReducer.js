import { SET_CHARACTER_DATA, SET_FILMS, SHOW_LOADING } from "../Actions/Action";

export default (state = {}, action) => {
    switch (action.type) {
     case SET_CHARACTER_DATA:
      return {
       characters: action.payload
      }
      case SET_FILMS:
        return {
          ...state,
          films: action.payload
        }
      case SHOW_LOADING:
        return{
          ...state,
          showLoading: action.payload
        }
     default:
      return state
    }
   }