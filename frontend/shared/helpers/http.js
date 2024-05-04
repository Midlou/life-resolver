import axios from 'axios';
import * as _ from 'lodash';

export default class HttpService {
    constructor(baseUrl, csrfToken = '') {
        this.configs = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        };

        this.configsForUpload = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'multipart/form-data;',
                // 'Accept': 'application/json',
                // 'Connection': 'close'
            }
        };
    }

    performPromise(promise) {
        return promise.then(res => res.data)
            .catch(err => { throw _.get(err.response, 'data') });
    }

    get(url, params) {
        let promise = axios.get(`${url}`, { ...this.configs, params });
        return this.performPromise(promise);
    }

    post(url, data = {}) {
        let promise = axios.post(`${url}`, data, this.configs);
        return this.performPromise(promise);
    }

    formData(url, data = {}) {
        let promise = axios.post(`${url}`, data, this.configsForUpload);
        return this.performPromise(promise);
    }

    put(url, data = {}) {
        let promise = axios.put(`${url}`, data, this.configs);
        return this.performPromise(promise);
    }

    delete(url) {
        let promise = axios.delete(`${url}`, this.configs);
        return this.performPromise(promise);
    }
}
