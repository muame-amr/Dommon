import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import { FC, useState } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

interface FormValues {
	username: string;
	password: string;
}

const signInSchema = Yup.object().shape({
	username: Yup.string()
		.required("Username is required")
		.min(6, "Username must be at least 6 characters")
		.max(20, "Username must be less than 20 characters"),
	password: Yup.string()
		.required("Password is required")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
			"Invalid password format"
		),
});

export const Login: FC = () => {
	const initialValues: FormValues = { username: "", password: "" };
	const [show, setShow] = useState<boolean>(false);

	return (
		<Flex
			bg="white"
			w="27em"
			pos={"relative"}
			mt={1}
			zIndex={99}
			rounded="md"
			shadow="lg"
			justifyContent="center"
			alignItems="center"
			flexDir="column"
			px={2}
			py={6}
		>
			<Heading fontSize="2xl" fontFamily="mono" color="pink.500">
				Login
			</Heading>
			<VStack flexDir="column">
				<Box w="18em">
					<Image
						src="/cyborg-sign-in.png"
						alt="Login Image"
						w="full"
						h="full"
					/>
				</Box>
				<Formik
					initialValues={initialValues}
					onSubmit={(values: FormValues, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 1000);
					}}
					validationSchema={signInSchema}
				>
					{(props: any) => {
						const {
							values,
							touched,
							errors,
							isSubmitting,
							handleChange,
							handleBlur,
							handleSubmit,
							dirty,
							isValid,
						} = props;
						return (
							<Form
								className={
									"flex flex-col justify-center items-center max-w-[18em]"
								}
							>
								<FormControl
									isInvalid={errors.username && touched.username}
									isRequired
								>
									<FormLabel
										fontSize="sm"
										fontWeight="semibold"
										color="pink.500"
									>
										Username
									</FormLabel>
									<Field
										as={Input}
										w="18em"
										h={9}
										px={3}
										fontSize="xs"
										color="gray.900"
										fontFamily="sans-serif"
										bg="gray.100"
										border={0}
										rounded="md"
										transition="all 0.2s ease-in-out"
										focusBorderColor="teal.300"
										name="username"
										placeholder="username"
									/>
									{errors.username && touched.username ? (
										<Text fontSize="xs" fontStyle="italic" color="red.500">
											{errors.username}
										</Text>
									) : undefined}
								</FormControl>
								<FormControl
									isInvalid={errors.password && touched.password}
									isRequired
								>
									<FormLabel
										fontSize="sm"
										fontWeight="semibold"
										color="pink.500"
										mt={4}
									>
										Password
									</FormLabel>
									<InputGroup>
										<Field
											as={Input}
											w="18em"
											h={9}
											px={3}
											fontSize="xs"
											color="gray.900"
											fontFamily="sans-serif"
											bg="gray.100"
											border={0}
											rounded="md"
											transition="all 0.2s ease-in-out"
											focusBorderColor={"teal.300"}
											name="password"
											type={show ? "text" : "password"}
											placeholder="password"
										/>
										<InputRightElement h={9}>
											<Button
												size="sm"
												_focus={{ outline: "none" }}
												onClick={() => setShow(!show)}
											>
												{show ? (
													<RiEyeCloseLine className="icon" />
												) : (
													<RiEyeLine className="icon" />
												)}
											</Button>
										</InputRightElement>
									</InputGroup>
									{errors.password && touched.password ? (
										<Text fontSize="xs" fontStyle="italic" color="red.500">
											{errors.password}
										</Text>
									) : undefined}
								</FormControl>
								<Button
									type="submit"
									variant="solid"
									bg="teal.300"
									color="white"
									fontSize="sm"
									fontWeight="semibold"
									px={5}
									py="0.5em"
									mt={4}
									border={0}
									rounded="md"
									cursor="pointer"
									_hover={{ bg: "teal.500" }}
									_focus={{ outline: "none" }}
									transition="all 0.2s ease-in-out"
									disabled={!(dirty && isValid)}
								>
									Sign In
								</Button>
							</Form>
						);
					}}
				</Formik>
			</VStack>
		</Flex>
	);
};
