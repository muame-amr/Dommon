import "./style.scss";
import React, { useState } from "react";
import loginImg from "../../assets/cyborg-sign-in.png";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

export const Login = ({
	username,
	password,
	handleChange,
	handleSubmit,
	errors,
}) => {
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	return (
		<div className="base-container">
			<div className="header">Login</div>
			<div className="content">
				<div className="image">
					<img src={loginImg} />
				</div>
				<form>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							placeholder="username"
							value={username}
							onChange={handleChange}
						/>
						<p>{errors.username}</p>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<div className="password-field">
							<input
								type={passwordShown ? "text" : "password"}
								name="password"
								placeholder="password"
								className="password"
								value={password}
								onChange={handleChange}
							/>
							{passwordShown ? (
								<RiEyeCloseLine
									onClick={togglePassword}
									className="field-icon"
								/>
							) : (
								<RiEyeLine onClick={togglePassword} className="field-icon" />
							)}
						</div>
						<p>{errors.password}</p>
					</div>
					<button type="button" className="btn" onClick={handleSubmit}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
