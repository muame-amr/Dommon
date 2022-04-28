import axios from "axios";

export const register = async (registerValues) => {
	console.log(registerValues);
	return await axios
		.post("http://localhost:8080/api/auth/register", registerValues)
		.then((res) => res)
		.catch((err) => err);
};

export const activationLink = (id) => {
	return axios
		.get(`http://localhost:8080/api/mail/${id}`)
		.then((res) => res)
		.catch((err) => err);
};
