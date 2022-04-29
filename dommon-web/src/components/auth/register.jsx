import "./style.scss";
import React, { useState } from "react";
import registerImg from "../../assets/cyborg-sign-up.png";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

export const Register = ({
	username,
	email,
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
			<div className="header">Register</div>
			<div className="content">
				<div className="image">
					<img src={registerImg} />
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
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="emailAddress"
							placeholder="email"
							value={email}
							onChange={handleChange}
						/>
						<p>{errors.emailAddress}</p>
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
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};
