import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { activationLink, register } from "./api/auth/auth";
import "./App.scss";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";

function App() {
	const [isLogIn, setIsLogIn] = useState(true);
	const loginInitial = { username: "", password: "" };
	const [loginValues, setLoginValues] = useState(loginInitial);
	const [loginErrors, setLoginErrors] = useState({});
	const registerInitial = { username: "", emailAddress: "", password: "" };
	const [registerValues, setRegisterValues] = useState(registerInitial);
	const [registerErrors, setRegisterErrors] = useState({});
	const [isSubmitLogin, setIsSubmitLogin] = useState(false);
	const [isSubmitRegister, setIsSubmitRegister] = useState(false);
	const rightSide = useRef();

	useEffect(() => {
		rightSide.current.classList.add("right");
	});

	useEffect(() => {
		if (Object.keys(loginErrors).length === 0 && isSubmitLogin) {
			console.log("Successfully logged in!");
		}
	}, [loginErrors]);

	useEffect(() => {
		if (Object.keys(registerErrors).length === 0 && isSubmitRegister) {
			console.log("User created!");
		}
	}, [registerErrors]);

	const handleClick = () => {
		if (isLogIn) {
			rightSide.current.classList.remove("right");
			rightSide.current.classList.add("left");
		} else {
			rightSide.current.classList.remove("left");
			rightSide.current.classList.add("right");
		}
		setIsLogIn(!isLogIn);
	};

	const handleChangeLogin = (e) => {
		const { name, value } = e.target;
		setLoginValues({ ...loginValues, [name]: value });
	};

	const handleChangeRegister = (e) => {
		const { name, value } = e.target;
		setRegisterValues({ ...registerValues, [name]: value });
	};

	const handleSubmitLogin = (e) => {
		e.preventDefault();
		setLoginErrors(validateLogin(loginValues));
		setIsSubmitLogin(true);
	};

	const handleSubmitRegister = (e) => {
		e.preventDefault();
		setRegisterErrors(validateRegister(registerValues));
		setIsSubmitRegister(true);
	};

	const validateLogin = (values) => {
		const errors = {};
		const passRegex = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		);
		if (!values.username) {
			errors.username = "Username is required!";
		}
		if (!values.password) {
			errors.password = "Password is required";
		} else if (!passRegex.test(values.password)) {
			errors.password = "Invalid password format!";
		}

		console.log(errors);
		return errors;
	};

	const validateRegister = (values) => {
		const errors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		const passRegex = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		);
		if (!values.username) {
			errors.username = "Username is required!";
		}
		if (!values.emailAddress) {
			errors.emailAddress = "Email is required!";
		} else if (!emailRegex.test(values.emailAddress)) {
			errors.emailAddress = "This is not a valid email format!";
		}
		if (!values.password) {
			errors.password = "Password is required";
		} else if (!passRegex.test(values.password)) {
			errors.password = "Invalid password format!";
		}

		register(values)
			.then((res) => {
				if (res.status === 201) {
					activationLink(res.data.data);
				} else {
					console.log("Users already exists !");
				}
			})
			.catch((err) => {
				console.log(err);
			});

		console.log(values);
		console.log(errors);
		return errors;
	};

	return (
		<div className="App">
			<div className="login">
				<div className="container">
					{isLogIn ? (
						<Login
							username={loginValues.username}
							password={loginValues.password}
							handleChange={handleChangeLogin}
							handleSubmit={handleSubmitLogin}
							errors={loginErrors}
						/>
					) : (
						<Register
							username={registerValues.username}
							password={registerValues.password}
							email={registerValues.emailAddress}
							handleChange={handleChangeRegister}
							handleSubmit={handleSubmitRegister}
							errors={registerErrors}
						/>
					)}
				</div>
				<div className="right-side" ref={rightSide} onClick={handleClick}>
					<div className="inner-container">
						<div className="text">{isLogIn ? "Register" : "Login"}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
