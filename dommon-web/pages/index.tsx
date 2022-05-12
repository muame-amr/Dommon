import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { FormikValues } from "formik";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { activationLink, login, register } from "../api/auth";
import { Login } from "../components/auth/login";
import { Register } from "../components/auth/register";
import { Banner } from "../components/banner/banner";
import { LoginValues, RegisterValues } from "../interfaces/auth";

const Home: NextPage = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [message, setMessage] = useState<string>("Lorem Ipsum Dolor Amet Sit");
	const [isSuccess, setIsSuccess] = useState<boolean>(true);
	const rightSide = useRef<any>();
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		rightSide.current.classList.add("right");
	});

	const handleClick = () => {
		if (isLogin) {
			rightSide.current.classList.remove("right");
			rightSide.current.classList.add("left");
		} else {
			rightSide.current.classList.remove("left");
			rightSide.current.classList.add("right");
		}
		setIsLogin(!isLogin);
	};

	const handleLogin = async (values: LoginValues) => {
		login(values).then((res) => {
			setIsVisible(true);
			if (res.status === 200) {
				console.log(res.data.data);
				setIsSuccess(res.data.success);
				setMessage(res.data.message);
			} else {
				setMessage(res.response.data.message);
				setIsSuccess(res.response.data.success);
			}
			setTimeout(() => {
				setIsVisible(false);
			}, 4000);
		});
	};

	const handleRegister = async (values: RegisterValues) => {
		register(values).then((res) => {
			setIsVisible(true);
			console.log(res);
			if (res.status === 201) {
				activationLink(res.data.data);
				setIsSuccess(res.data.success);
				setMessage(res.data.message);
			} else {
				setMessage(res.response.data.message);
				setIsSuccess(res.response.data.success);
			}
			setTimeout(() => {
				setIsVisible(false);
			}, 4000);
		});
	};

	const handleBanner = () => {
		setIsVisible(false);
	};

	return (
		<Box
			bg="url(https://i.ibb.co/Mgfy214/mainbg.jpg)"
			bgPos={["auto", "center"]}
			bgSize={["stretch", "cover", "cover"]}
			bgRepeat="no-repeat"
			h="full"
		>
			<Flex
				bg="whiteAlpha.400"
				backdropFilter="auto"
				backdropBlur="sm"
				h="100vh"
				justifyContent="center"
				alignItems="center"
			>
				{isLogin ? (
					<Login handleLogin={handleLogin} />
				) : (
					<Register handleRegister={handleRegister} />
				)}
				<div className="right-side" ref={rightSide} onClick={handleClick}>
					<div className="text">{isLogin ? "Register" : "Login"}</div>
				</div>
				{isVisible ? (
					<Banner
						handleBanner={handleBanner}
						message={message}
						isSuccess={isSuccess}
					/>
				) : undefined}
			</Flex>
		</Box>
	);
};

export default Home;
