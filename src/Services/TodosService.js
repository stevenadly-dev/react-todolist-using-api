import axios from 'axios';
import { API_MAIN_URL_TASk } from '../config';


export function getAllTasks(uToken) {
    try {
        return axios({
            method: 'GET',
            url: `${API_MAIN_URL_TASk}`,
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


