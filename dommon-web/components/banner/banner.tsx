import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	CloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props {
	handleBanner: () => void;
	message: string;
	isSuccess: boolean;
}

export const Banner: FC<Props> = ({ handleBanner, message, isSuccess }) => {
	return (
		<Alert
			status={isSuccess ? "success" : "error"}
			variant="left-accent"
			height="auto"
			width="auto"
			maxWidth={["14rem", "2xs", "xs"]}
			zIndex={999}
			position="absolute"
			roundedRight={"xl"}
			bottom={3}
			right={3}
			py={3}
			cursor="pointer"
			className={"animate-fade"}
			onClick={handleBanner}
		>
			<AlertIcon mx={2} />
			<AlertDescription fontSize="sm" px={3}>
				{message}
			</AlertDescription>
		</Alert>
	);
};
