import axios from "axios";
import { LoginValues, RegisterValues } from "../interfaces/auth";

export const register = async (registerValues: RegisterValues) => {
	console.log(registerValues);
	return await axios
		.post("https://dommon.herokuapp.com/api/auth/register", registerValues)
		.then((res) => res)
		.catch((err) => err);
};

export const activationLink = (id: number) => {
	return axios
		.get(`https://dommon.herokuapp.com/api/mail/${id}`)
		.then((res) => res)
		.catch((err) => err);
};

export const login = async (loginValues: LoginValues) => {
	return await axios
		.post("https://dommon.herokuapp.com/api/auth/login/user", loginValues)
		.then((res) => res)
		.catch((err) => err);
};
