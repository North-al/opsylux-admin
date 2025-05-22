import axios from 'axios'

const headers = {
    authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJOb3J0aCIsInN1YiI6IjEiLCJpYXQiOjE3NDc4OTUzNzEsImV4cCI6MTc0ODI1NTM3MSwidXNlcm5hbWUiOiJOb3J0aCIsInVzZXJJZCI6MX0.hzqLyaA70BC702bgCtDTL2uDPVI93yFksja8jqL3rbM'
}
export const fetchMenuTree = () =>
    axios.get<{ data: SysMenu[] }>('http://localhost:8080/v1/api/menu/tree?type=0,1', { headers })
export const fetchUserList = (params: { page: number; limit: number }) =>
    axios.get<{ data: any }>('http://localhost:8080/v1/api/user', {
        params,
        headers
    })
