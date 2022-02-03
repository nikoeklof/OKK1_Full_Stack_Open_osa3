import axios from 'axios'
const baseUrl = 'https://young-wave-85696.herokuapp.com/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}
const update = (id, newObject) =>{
    return axios.put(`${baseUrl}/${id}`, newObject)
}
const destroy = (id) =>{
    return axios.delete(baseUrl + '/' + id)
}

export default { 
    getAll: getAll, 
    create: create, 
    update: update,
    destroy: destroy
  }