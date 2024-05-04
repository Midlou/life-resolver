import HttpService from "../../shared/helpers/http";

const baseUrl = '/transactions/dashboards';

export default class transactionService extends HttpService {

    query(params = {}) {
        return this.get(`${baseUrl}`, params);
    }

    find(id, params = {}) {
        return this.get(`${baseUrl}/${id}`, params);
    }
}
