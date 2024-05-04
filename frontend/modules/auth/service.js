import { get_only_numbers, validate_document } from "../../shared/constants/helpers";
import HttpService from "../../shared/helpers/http";

const baseUrl = '/register';

const validations = {
	name: {
		message: <span>O campo <b>usuário</b> não pode ficar vazio!</span>,
		condition: (state) => state.name
	},
	email: {
		message: <span>O campo <b>senha</b> não pode ficar vazio!</span>,
		condition: (state) => state.email
	},
	phone: {
		message: <span>O campo <b>telefone celular</b> não pode ficar vazio!</span>,
		condition: (state) => state.phone
	},
	document: {
		message: <span>O campo <b>documento</b> deve ser um CPF ou CNPJ válido!</span>,
		condition: (state) => validate_document(state.document)
	},
	password: {
		message: <span><b>Confirmação da senha</b> não bate com a <b>senha</b>. Reescreva a senha ou confirmação de senha de forma que sejam idênticas</span>,
		condition: (state) => {
			if (!state.id && !state.password) return true;
			return state.password == state.password_confirmation
		}
	},
	cep: {
		message: <span>O campo <b>CEP</b> não pode ficar vázio!</span>,
		condition: (state) => state.cep
	},
	street_number: {
		message: <span>O campo <b>número</b> não pode ficar vázio!</span>,
		condition: (state) => state.cep
	},
	city: {
		message: <span>O campo <b>cidade</b> não pode ficar vázio!</span>,
		condition: (state) => state.city
	},
	street: {
		message: <span>O campo <b>logradouro</b> não pode ficar vázio!</span>,
		condition: (state) => state.street
	},
	district: {
		message: <span>O campo <b>bairro</b> não pode ficar vázio!</span>,
		condition: (state) => state.district
	},
	federative_unit: {
		message: <span>O campo <b>estado</b> não pode ficar vázio!</span>,
		condition: (state) => state.federative_unit
	},
};

export default class authService extends HttpService {

	register(data) {
		return this.post(`${baseUrl}`, data);
	}

	sanitize(data) {
		data.phone = get_only_numbers(data.phone);
		data.document = get_only_numbers(data.document);

		return data;
	}

	getValidation() {
		return validations;
	}
}
