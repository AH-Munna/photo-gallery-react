import * as actTypes from './ActionType.js';
import axios from 'axios';

export const selectCategory = category => {
    return {
        type: actTypes.CATEGORY_SELECT,
        payload: category,
    }
}
export const commentAdd = (comment, response) => {
    return {
        type: actTypes.ADD_COMMENT,
        payload: {
            comment: comment,
            key: response.data.name,
        }
    }
}
export const addFailed = error => {
    return {
        type: actTypes.ADD_COMMENT_FAILED,
        payload: error
    }
}

export const addComment = commentObj => dispatchEvent => {
    axios.post("https://photo-gallery-ah-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json", commentObj)
        .then(response => {
            dispatchEvent(commentAdd(commentObj, response))
        })
        .catch(error => {
            dispatchEvent(addFailed(error.message))
        });
}


const commentsLoad = comments => {
    return {
        type: actTypes.LOAD_COMMENT,
        payload: comments
    }
}
const commentsLoadFailed = error => {
    return {
        type: actTypes.LOAD_COMMENT_FAILED,
        payload: error
    }
}
export const asyncFetchComments = () => dispatch => {
    axios.get('https://photo-gallery-ah-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json')
        .then(response => dispatch(commentsLoad(response.data)))
        .catch(error => dispatch(commentsLoadFailed(error.message)));
}