import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            onClick={() => loginWithRedirect()}
            bg="white"
            color="teal.600"
            _hover={{ bg: "gray.100" }}
        >
            Log In
        </Button>
    );
};

export default LoginButton;
