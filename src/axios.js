import axios from "axios";

const instance = axios.create ({
    baseURL: 'https://todolist-42a7d-default-rtdb.firebaseio.com/'
})

export default instance