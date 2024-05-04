import _ from "lodash";
import { toast } from "react-toastify";
import HttpService from "../../shared/helpers/http";

const baseUrl = '/settings';

const validations = {};

export default class SettingService extends HttpService {

	query(params = {}) {
		return this.get(`${baseUrl}`, params);
	}

	update(data) {
		return this.post(`${baseUrl}`, data)
	}

	sanitize(data) {
		// data.contact_phone = data?.contact_phone.replace(/\D/g, "");

		return data;
	}

	getValidation() {
		return validations;
	}

}
