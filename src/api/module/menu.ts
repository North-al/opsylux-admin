import axios from 'axios'

export const fetchMenuTree = () => axios.get<{ data: SysMenu[] }>('http://localhost:8080/v1/api/menu/tree?type=0,1')
