import { Box, Flex, Heading, Spacer, Container, Text, Spinner, Center } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Dashboard from './Dashboard';

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return (
      <Center h="100vh" w="100vw" bg="gray.50">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <Box minH="100vh" w="100vw" bg="gray.50">
      <Flex as="nav" p="4" bg="teal.600" color="white" alignItems="center" boxShadow="md" w="100%">
        <Heading size="md" color="white">Book App</Heading>
        <Spacer />
        {isAuthenticated ? (
          <Flex alignItems="center" gap="4">
            <Text color="white">Welcome, {user?.name}</Text>
            <LogoutButton />
          </Flex>
        ) : (
          <LoginButton />
        )}
      </Flex>
      <Container maxW="container.xl" p="6" centerContent={false}>
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <Center h="60vh" w="100%">
            <Box textAlign="center" p="8" bg="white" borderRadius="lg" boxShadow="lg" maxW="md">
              <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb="4">
                Welcome to Book App
              </Text>
              <Text fontSize="lg" color="gray.600">
                Please log in to manage your books.
              </Text>
            </Box>
          </Center>
        )}
      </Container>
    </Box>
  );
}

export default App;
