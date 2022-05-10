import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Login } from "../components/auth/login";
import { Register } from "../components/auth/register";

const Home: NextPage = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const rightSide = useRef<any>();

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

	return (
		<Box
			bg="url(https://i.ibb.co/Mgfy214/mainbg.jpg)"
			bgPos="center"
			bgSize="cover"
			bgRepeat="no-repeat"
			w="full"
			h="100vh"
		>
			<Flex
				bg="whiteAlpha.400"
				backdropFilter="auto"
				backdropBlur="sm"
				h="100vh"
				w="full"
				justifyContent="center"
				alignItems="center"
			>
				{isLogin ? <Login /> : <Register />}
				<div className="right-side" ref={rightSide} onClick={handleClick}>
					<div className="text">{isLogin ? "Register" : "Login"}</div>
				</div>
			</Flex>
		</Box>
	);
};

export default Home;
