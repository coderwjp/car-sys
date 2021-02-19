import {request,localrequest} from 'network/request';


export function getTableData(param){
    return localrequest({
        url: './table.json',
        method: 'get',
        query:param
    });
}

export function getMenuData(param){
    return localrequest({
        url: './menu.json',
        method: 'get',
        query:param
    });
}

