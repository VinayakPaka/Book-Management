import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            onClick={() => loginWithRedirect()}
            bg="teal.600"
            color="white"
            width="full"
            size="lg"
            _hover={{ bg: "teal.700" }}
        >
            Log In
        </Button>
    );
};

export default LoginButton;
