import { link } from '../env.local.json';

export const registerRequest = async (data) => {
    switch (data.type) {
        case 'student':
            return fetch(`${link}/student/create`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
                .then(r => r.json())
        case 'teacher':
            return fetch(`${link}/teacher/create`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
                .then(r => r.json())
    }

}