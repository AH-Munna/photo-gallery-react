import * as actTypes from './ActionType.js';
import { beach, category, flower, nature, space } from '../Components/Body/Gallery/imageData.js';

const INITIAL_STATE = {
    auth: { token: null, userId: null, authLoading: false, authFailedMessage: null },
    images: null,
    selectedCategory: null,
    category: category,
    email: null,
    comments: {},
    commentsLoadError: null,
}

export const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actTypes.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                auth: {
                    token: action.payload.token,
                    userId: action.payload.userId,
                    authFailedMessage: null,
                },
                images: null,
                selectedCategory: null,
                category: category,
                email: localStorage.getItem('email'),
            }
        case actTypes.AUTHENTICATION_LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("expirationTime");
            localStorage.removeItem("email");
            return {
                ...state,
                auth: {
                    token: null,
                    userId: null,
                    authFailedMessage: null,
                },
                email: null,
            }
        case actTypes.AUTHENTICATION_LOADING:
            return {
                ...state,
                auth: { authLoading: action.payload }
            }
        case actTypes.AUTHENTICATION_FAILED:
            return {
                ...state,
                auth: { authFailedMessage: action.payload }
            }
        case actTypes.CATEGORY_SELECT:
            switch (action.payload) {
                case "Beach":
                    return {
                        ...state,
                        selectedCategory: action.payload,
                        images: beach,
                    }
                case "Flower":
                    return {
                        ...state,
                        selectedCategory: action.payload,
                        images: flower,
                    }
                case "Space":
                    return {
                        ...state,
                        selectedCategory: action.payload,
                        images: space,
                    }
                case "Nature":
                    return {
                        ...state,
                        selectedCategory: action.payload,
                        images: nature,
                    }
                default:
                    return state;
            }
        case actTypes.ADD_COMMENT:
            const comments = { ...state.comments }
            comments[action.payload.key] = action.payload.comment;
            return {
                ...state,
                comments: comments,
            }
        case actTypes.LOAD_COMMENT:
            return {
                ...state,
                comments: action.payload,
            }
        case actTypes.LOAD_COMMENT_FAILED:
            return {
                ...state,
                commentsLoadError: action.payload,
            }
        default:
            return state;
    }
}