import { useEffect, useRef, useState } from "react";
import { activationLink, login, register } from "../../api/auth/auth";
import { Login } from "./login";
import { Register } from "./register";
import { Buffer } from "buffer";
import "./auth.scss";
import Cookies from "universal-cookie";
import { Alert } from "react-bootstrap";

export const Auth = () => {
	const [isLogIn, setIsLogIn] = useState(true);
	const loginInitial = { username: "", password: "" };
	const [loginValues, setLoginValues] = useState(loginInitial);
	const [loginErrors, setLoginErrors] = useState({});
	const registerInitial = { username: "", emailAddress: "", password: "" };
	const [registerValues, setRegisterValues] = useState(registerInitial);
	const [registerErrors, setRegisterErrors] = useState({});
	const [isSubmitLogin, setIsSubmitLogin] = useState(false);
	const [isSubmitRegister, setIsSubmitRegister] = useState(false);
	const [alert, setAlert] = useState({ success: true, message: "" });
	const [show, setShow] = useState(false);
	const rightSide = useRef();

	useEffect(() => {
		rightSide.current.classList.add("right");
	});

	// useEffect(() => {
	// 	if (Object.keys(loginErrors).length === 0 && isSubmitLogin) {
	// 		console.log("Successfully logged in!");
	// 	}
	// }, [loginErrors]);

	// useEffect(() => {
	// 	if (Object.keys(registerErrors).length === 0 && isSubmitRegister) {
	// 		console.log("User created!");
	// 	}
	// }, [registerErrors]);

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
		if (Object.keys(loginErrors).length === 0) {
			const credentials = Buffer.from(
				`${loginValues.username}:${loginValues.password}`
			).toString("base64");

			login(loginValues, credentials)
				.then((res) => {
					console.log("STATUS CODE: " + res.status);
					if (res.status === 200) {
						const cookies = new Cookies();
						cookies.set("auth_token", res.data.data, { path: "/" });
						setAlert({ success: true, message: "Successfully logged in!" });
					} else {
						setAlert({
							success: false,
							message: "Wrong email or password or account is not activated!",
						});
					}
					setShow(true);
					setTimeout(() => {
						setShow(false);
					}, 5000);
				})
				.catch((err) => {});

			console.log(alert);
		}
		setIsSubmitLogin(true);
	};
	const handleSubmitRegister = (e) => {
		e.preventDefault();
		setRegisterErrors(validateRegister(registerValues));
		if (Object.keys(registerErrors).length === 0) {
			register(registerValues)
				.then((res) => {
					if (res.status === 201) {
						activationLink(res.data.data);
						setAlert({
							success: true,
							message:
								"Activation link sent to your email! Please check your email!",
						});
					} else {
						setAlert({
							success: false,
							message: "User already exists !",
						});
					}
					setShow(true);
					setTimeout(() => {
						setShow(false);
					}, 5000);
				})
				.catch((err) => {
					console.log(err);
				});
		}
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

		return errors;
	};

	return (
		<div className="bg-image">
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
			<Alert className="alert" show={show} variant="success">
				<Alert.Heading>{alert.message}</Alert.Heading>
			</Alert>
		</div>
	);
};
