import axios from 'axios';
import { API_MAIN_URL_USER } from '../config';


export function registeration(userData) {
    try {
        return axios({
            method: 'POST',
            url: `${API_MAIN_URL_USER}/register`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: userData,
        }).then((res) => console.log(res));
    } catch (error) {
        if (error.response) {
            debugger
            //do something
        } else if (error.request) {
            debugger

            //do something else

        } else if (error.message) {
            debugger

            //do something other than the other two

        }
        // console.log('Registeration Error happenned !!', err)
    }
}


export function login(userData) {
    try {


        return axios({
            method: 'POST',
            url: `${API_MAIN_URL_USER}/login`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: userData,
        }).then((res) => {
            return res.data
        })
    } catch (error) {
        if (error.response) {
            debugger
            //do something
        } else if (error.request) {
            debugger

            //do something else

        } else if (error.message) {
            debugger

            //do something other than the other two

        }
        // console.log('Registeration Error happenned !!', err)
    }
}

export function logout(uToken) {
    try {
        return axios({
            method: 'POST',
            url: `${API_MAIN_URL_USER}/logout`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': uToken
            },
        }).then((res) => {
            return res.data
        })
    } catch (error) {
        if (error.response) {
            debugger
            //do something
        } else if (error.request) {
            debugger

            //do something else

        } else if (error.message) {
            debugger

            //do something other than the other two

        }
        // console.log('Registeration Error happenned !!', err)
    }
}

export function checkAuthentication() {



    return (!!(
        localStorage.getItem("todoToken") !== null ||
        localStorage.getItem("todoToken") !== ""
    ))

}
