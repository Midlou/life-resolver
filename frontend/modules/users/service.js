import { get_only_numbers } from "../../shared/constants/helpers";
import HttpService from "../../shared/helpers/http";

const baseUrl = '/users';

const validations = {
	name: {
		message: <span>O campo <b>nome</b> não pode ficar vazio!</span>,
		condition: (state) => state.name
	},
	email: {
		message: <span>O campo <b>senha</b> não pode ficar vazio!</span>,
		condition: (state) => state.email
	},
	password: {
		message: <span><b>Confirmação da senha</b> não bate com a <b>senha</b>. Reescreva a senha ou confirmação de senha de forma que sejam idênticas</span>,
		condition: (state) => {
			if (!state.id && !state.password) return true;
			return state.password == state.password_confirmation
		}
	},
};

export default class userService extends HttpService {

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
		return data;
	}

	getValidation() {
		return validations;
	}
}
