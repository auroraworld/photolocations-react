import request from 'superagent'
import {showError} from './error'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const REQUEST_POSTS = 'REQUEST_POSTS'

export const requestComments = () => {
  return {
    type: REQUEST_POSTS
  }
}

export const receiveAllComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments: JSON.parse(comments)
  }
}

export const receiveComment = (id) => {
  return {
    type: RECEIVE_COMMENT
  }
}

export function getAllComments(id) {
  return (dispatch) => {
    dispatch(requestComments())
    return request
      .get(`/api/v1/comments/${id}`)
      .then(res => {
        dispatch(receiveAllComments(res.text))
      })
      .catch(() => {
        dispatch(showError('An unexpected error has occurred.'))
      })
  }
}

export function addComment(comment) {
  return (dispatch) => {
    return request
      .post('/api/v1/comments')
      .send(comment)
      // .then(res = > {
      //   dispatch(receiveComment(res.body))
      // })
      .catch(() => {
        dispatch(showError('Problems saving comment'))
      })
  }
}
