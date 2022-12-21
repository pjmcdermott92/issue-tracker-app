import { api } from './api';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const PROJECT_URLS = {
    GET_PROJECTS: BASE_URL + '/projects'
}

const getAllProjects = () => api.get(PROJECT_URLS.GET_PROJECTS);


export {
    getAllProjects
}
