import { LOGIN, CHANGE_WHITE, CHANGE_BLACK, FORCEUSERIN, LOGOUT, UPDATE_USER } from "../action/appStorage";


const initialState = {
    token: "",
    expiresIn: "",
    user: null,
    allQuiz: [],
    allChallenge:[],
    allStories: [],

}


export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_WHITE:
            if (action.payload) {
                return {
                    ...state,
                    background: action.payload.background,
                    importantText: action.payload.importantText,
                    normalText: action.payload.normalText,
                    fadeColor: action.payload.fadeColor,
                    blue: action.payload.blue,
                    fadeButtonColor: action.payload.fadeButtonColor,
                }
            }
            break;
        case CHANGE_BLACK:
            if (action.payload) {
                return {
                    ...state,
                    background: action.payload.background,
                    importantText: action.payload.importantText,
                    normalText: action.payload.normalText,
                    fadeColor: action.payload.fadeColor,
                    blue: action.payload.blue,
                    fadeButtonColor: action.payload.fadeButtonColor,
                }
            }
            break;
        case FORCEUSERIN:
            if (action.payload) {
               
                return {
                    ...state,
                    token: action.payload.token,
                    expiresIn: action.payload.expiresIn,
                    user: action.payload.user,
                    transactions: action.payload.transactions,
                    admin: action.payload.admin,
                   
                };
            }
            break;

            
        
            
         
        case LOGIN:
            if (action.payload) {
                console.log(action.payload)
                return {
                    ...state,
                    token: action.payload.token,
                    expiresIn: action.payload.expiresIn,
                    user: action.payload.user,
                    allQuiz: action.payload.allQuiz,
                    allChallenge: action.payload.allChallenge,
                    allStories: action.payload.allStories,
                }
            }
            break;
        
        case UPDATE_USER:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload
                }
            }
            break;
        case LOGOUT:
            if (action.payload) {
                return null; 
            }
            return state; 
        // other cases...
        default:
            return state; 
    }

}
