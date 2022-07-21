import { link } from '../env.local.json';

export const authRequest = async (email, password) => {
    console.log(email, password);
    return fetch(`${link}/student/auth`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password}),
        })
        .then(r => r.json())
}