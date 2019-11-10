import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/users';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    addUser(user) {
        return axios.post(USER_API_BASE_URL + "/create", user);
    }
}

export default new ApiService();