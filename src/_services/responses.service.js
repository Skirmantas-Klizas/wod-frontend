import { authHeader } from '../_helpers';
import axios from 'axios';
const url = 'https://wods-api.herokuapp.com';

export const responsesService = {
    postResponse,
    updateResponse,
    deleteResponse
};

async function postResponse(response) {
    try {
        const res = await axios({
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            url: url + '/responses',
            data: JSON.stringify(response)
        });
        const data = handleResponse(res);
        console.log(data);
        return data.createdResponse;
    } catch (err) {
        console.log(err);
    }
}

async function updateResponse(response) {
    try {
        const res = await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            url: url + `/responses/${response._id}`,
            data: JSON.stringify(response)
        });
        handleResponse(res);
        return response;
    } catch (err) {
        console.log(err);
    }
}

async function deleteResponse(id) {
    try {
        const res = await axios({
            method: 'DELETE',
            headers: authHeader(),
            url: url + `/responses/${id}`
        });
        return handleResponse(res);
    } catch (err) {
        console.log(err);
    }
}

function handleResponse(response) {
    const data = response.data;

    if (response.request.readyState !== 4) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        } else if (response.status === 400) {
            alert('Something went wrong');
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}
