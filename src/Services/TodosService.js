import axios from 'axios';
import { API_MAIN_URL_TASk } from '../config';


export function getAllTasks(uToken) {
    return axios({
        method: 'GET',
        url: `${API_MAIN_URL_TASk}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': uToken
        },
    })

}

export function addTask(uToken, task) {
    try {
        return axios({
            method: 'POST',
            url: `${API_MAIN_URL_TASk}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': uToken
            },
            data: task,
        }).then((res) => {
            console.log(res);
            return res;
        });
    } catch (error) {

    }
}

export function deleteTask(uToken, taskId) {
    try {
        return axios({
            method: 'DELETE',
            url: `${API_MAIN_URL_TASk}/${taskId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': uToken
            },
        }).then((res) => {
            console.log(res);
            return res;
        });
    } catch (error) {

    }
}

export function toggleCompleted(uToken, taskId, isCompleted) {
    try {
        return axios({
            method: 'PUT',
            url: `${API_MAIN_URL_TASk}/${taskId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': uToken
            },
            data: {
                "completed": !isCompleted
            }
        }).then((res) => {
            console.log(res);
            return res;
        });
    } catch (error) {

    }
}

export function getSingleTask(uToken, taskId) {
    try {
        return axios({
            method: 'GET',
            url: `${API_MAIN_URL_TASk}/${taskId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': uToken
            },
        }).then((res) => {
            console.log(res);
            return res;
        });
    } catch (error) {

    }
}

export function updateTask(uToken, taskId, description) {
    try {
        return axios({
            method: 'PUT',
            url: `${API_MAIN_URL_TASk}/${taskId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': uToken
            },
            data: {
                "description": description
            }
        }).then((res) => {
            console.log(res);
            return res;
        });
    } catch (error) {

    }
}

export function toggleCompletedFull(uToken, taskId, isCompleted, descripton) {
    debugger
    try {
        return axios({
            method: 'PUT',
            url: `${API_MAIN_URL_TASk}/${taskId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': uToken
            },
            data: {
                "completed": !isCompleted,
                'description': descripton
            }
        }).then((res) => {
            console.log(res);
            return res;
        });
    } catch (error) {

    }
}
