import "./style.scss";
import React from "react";
import loginImg from "../../assets/cyborg-sign-in.png";

export const Login = ({
	username,
	password,
	handleChange,
	handleSubmit,
	errors,
}) => {
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
						<input
							type="password"
							name="password"
							placeholder="password"
							value={password}
							onChange={handleChange}
						/>
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
