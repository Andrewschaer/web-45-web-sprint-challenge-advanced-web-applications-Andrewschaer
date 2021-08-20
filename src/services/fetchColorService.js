import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = () => {
    return axiosWithAuth()
        .get('/colors')
        .then(res=>{
            return res
        })
        .catch(err=>{
            console.log('Error with fetchCS call', err)
        
        })
}

export default fetchColorService;