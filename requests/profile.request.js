import { link } from '../env.local.json';
import axios from 'axios';

export const profileRequest = async (email) => {
    console.log(email)
    return fetch(`${link}/find`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
        .then(r => r.json())
}

export const updateAvatarRequest = async (user, avatar) => {
    const URL = `${link}/updateAvatar?email=${user}`;
    const formData = new FormData();
    formData.append('image', avatar)

    return axios.post(URL, formData, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(res => res.status === 200 && res.data);
}