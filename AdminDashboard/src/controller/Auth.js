import { host } from "../helper/config"
import axios from 'axios'

export const login = async (data) => {

    // var salt = bcrypt.genSaltSync(5);
    // var hash = bcrypt.hashSync(password, salt);

    const response = await axios.post(host + '/user/login', data,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        }
    )

    if (response && response.status === 200) {
        return response.data || {}
    }

    return {}
}

export const register = async (data) => {

    // var salt = bcrypt.genSaltSync(5);
    // var hash = bcrypt.hashSync(password, salt);

    const response = await axios.post(host + '/user/signup', data,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })

    if (response && response.status === 200) {
        return response.data || {}
    }
    return {}
}

export const updateUser = async (data) => {

    // var salt = bcrypt.genSaltSync(5);
    // var hash = bcrypt.hashSync(password, salt);

    const response = await axios.post(host + '/user/update', data,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })

    if (response && response.status === 200) {
        return response.data || {}
    }
    return {}
}

/* 
export const logout = () => {
    localStorage.removeItem('user');
} */