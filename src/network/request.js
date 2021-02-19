import axios from 'axios';

export function request(config){
    const service = axios.create({
        baseURL:'http://192.168.1.111:8080',
        timeout: 5000
    });
    
    service.interceptors.request.use(
        config => { console.log(config); return config;},
        error => {console.log(error);}
    );
    
    service.interceptors.response.use(
        response => {console.log(response);  return response.data;},
        error => { console.log(error);}
    );

    return service(config);

}
export function localrequest(config){
    const service = axios.create({
        // baseURL:'',
        timeout: 5000
    });
    
    service.interceptors.request.use(
        config => { console.log(config); return config;},
        error => {console.log(error);}
    );
    
    service.interceptors.response.use(
        response => {console.log(response);  return response.data;},
        error => { console.log(error);}
    );

    return service(config);

}


