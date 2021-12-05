import axios from 'axios';
import { login, logout } from '../../Services/AuthService';
import { authConstants } from './authConstants';
import { browserHistory } from "react-router";
import { createBrowserHistory } from 'history';


const history = createBrowserHistory();



//action users 
// ==================================================================LOGIN
export const loginAction = (userData) => {
    return (dispatch) => {
        dispatch(loginRequest());
        // login Fn @authService
        login(userData)
            .then(res => {
                let currentUser = res.data;
                localStorage.setItem("todoToken", JSON.stringify(currentUser.token));
                // dh 2l action payload
                dispatch(loginSuccess(currentUser));
                window.location = window.location.origin + '/todolist'
                // history.push('/todolist');

            }).catch(err => {
                // err.messsage ==>> dh 2l action payload
                dispatch(loginFailed(err.messsage));
            })
    }
}

export const loginRequest = () => {
    return {
        type: authConstants.LOGIN_REQUEST
    }
}

export const loginSuccess = ({ token, user }) => {
    return {
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user }
    }
}

export const loginFailed = (errors) => {
    return {
        type: authConstants.LOGIN_FAILED,
        payload: errors
    }
}
// ----------------------------------------------------------------LOGOUT
export const logoutAction = (uToken) => {
    debugger
    return (dispatch) => {
        dispatch(loginRequest());
        logout(uToken).then((res) => {
            // dispatch(loginSuccess(currentUser));
            debugger
            if (res.data?.success) dispatch(LogoutSuccess());
            localStorage.removeItem("todoToken");
            window.location = window.location.origin + '/login'
        }).catch(err => {
            debugger
            // err.messsage ==>> dh 2l action payload
            dispatch(LogoutFailed());
            // dispatch(loginFailed(err.messsage));
        })
    }
}

export const LogoutRequest = () => {
    return {
        type: authConstants.LOGOUT_REQUEST
    }
}

export const LogoutSuccess = () => {
    return {
        type: authConstants.LOGOUT_SUCCESS,
        // payload: { token, user }
    }
}

export const LogoutFailed = () => {
    return {
        type: authConstants.LOGOUT_FAILED,
        // payload: errors
    }
}
