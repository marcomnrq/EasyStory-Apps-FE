import axios from 'axios'

export default axios.create({
    baseURL: 'https://easystoryapi2020.azurewebsites.net/api',
    headers: {
        'Content-type': 'application/json'
    }
});
