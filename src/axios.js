import axios from "axios";

const instance = axios.create ({
    baseURL: 'https://todolist-f1182-default-rtdb.firebaseio.com/'
})

export default instance