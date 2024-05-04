import _ from "lodash";
import HttpService from "../../shared/helpers/http";

const baseUrl = '/categories';

const validations = {
	name: {
		message: <span>O campo <b>título</b> não pode ficar vazio!</span>,
		condition: (state) => state.name
	}
};

export default class catalogService extends HttpService {

	query(params = {}) {
		return this.get(`${baseUrl}`, params);
	}

	find(id, params = {}) {
		return this.get(`${baseUrl}/${id}`, params);
	}

	store(data) {
		return this.formData(`${baseUrl}`, data);
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
		return data;
	}

	getValidation() {
		return validations;
	}
}
