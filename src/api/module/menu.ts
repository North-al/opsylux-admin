import axios from 'axios'

export const fetchMenuTree = () => axios.get<{ data: SysMenu[] }>('http://localhost:8080/v1/api/menu/tree?type=0,1')
export const fetchUserList = (params: { page: number; limit: number }) =>
    axios.get<{ data: any }>('http://localhost:8080/v1/api/user', {
        params,
        headers: {
            authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJOb3J0aCIsInN1YiI6IjEiLCJpYXQiOjE3NDc4NDIyNjEsImV4cCI6MTc0Nzg0NTg2MSwidXNlcm5hbWUiOiJOb3J0aCIsInVzZXJJZCI6MX0.YaRE4bHcSMpFUrigsGZ_ecq14k5lQ8q8Zmq--mfqwm0'
        }
    })
