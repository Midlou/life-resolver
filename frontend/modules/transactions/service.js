import HttpService from "../../shared/helpers/http";

const baseUrl = '/transactions';

const validations = {
};

export default class transactionService extends HttpService {

    query(params = {}) {
        return this.get(`${baseUrl}`, params);
    }

    find(id, params = {}) {
        return this.get(`${baseUrl}/${id}`, params);
    }

    store(data) {
        return this.post(`${baseUrl}`, data);
    }

    update(id, data) {
        return this.put(`${baseUrl}/${id}`, data)
    }

    destroy(id) {
        return this.delete(`${baseUrl}/${id}`, {})
    }

    restore(id) {
        return this.put(`${baseUrl}/${id}/restore`, {})
    }

    sanitize(data) {
        data.category_id = data.category && data.category.id;

		delete data.category;

        return data;
    }

    getValidation() {
        return validations;
    }
}
