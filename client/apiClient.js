import request from 'superagent'

export function getAllLocations() {
  return request
    .get('/api/v1/locations')
    .then(res => {
      return res.body
    })
    .catch(err => {
      console.error(err)
    })
}

export function getLocation(id){
  return request
  .get('/api/v1/locations/'+id)
  .then(res => {
    return res.body
  })
  .catch(err => {
    console.error(err)
  })
}

export function getAllComments(id){
  return request
  .get('/api/v1/comments/'+id)
  .then(res => {
    return res.body
  })
  .catch(err => {
    console.error(err)
  })
}