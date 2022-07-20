export const weatherRequest = async (city = 'Moscow') => {
    const API_KEY = 'ce4eb5f6265322e2170f259274907af7'
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
    return fetch(URL).then(res => res.json());
}