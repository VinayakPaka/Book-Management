import { useState } from 'react';
import {
    Box,
    Heading,
    Button,
    Table,
    IconButton,
    Flex,
    useDisclosure,
    Text,
    Spinner,
    Center,
} from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_BOOKS } from './graphql/queries';
import { DELETE_BOOK } from './graphql/mutations';
import BookModal from './components/BookModal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
    const { data, loading, error } = useQuery<any>(GET_BOOKS);
    const [selectedBook, setSelectedBook] = useState<{ id: number; name: string; description: string } | null>(null);
    const { open, onOpen, onClose } = useDisclosure();

    const [deleteBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => {
            console.log('Book deleted.');
        },
        onError: (err: any) => {
            console.error('Error deleting book.', err.message);
        }
    });

    const handleAdd = () => {
        setSelectedBook(null);
        onOpen();
    };

    const handleEdit = (book: any) => {
        setSelectedBook(book);
        onOpen();
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            deleteBook({ variables: { id } });
        }
    };

    if (loading) return <Center p={10}><Spinner size="xl" color="teal.500" /></Center>;
    if (error) return <Text color="red.500">Error: {error.message}</Text>;

    return (
        <Box bg="white" p="6" borderRadius="lg" boxShadow="lg">
            <Flex justifyContent="space-between" alignItems="center" mb="6">
                <Heading size="lg" color="gray.700">My Books</Heading>
                <Button
                    bg="teal.500"
                    color="white"
                    _hover={{ bg: "teal.600" }}
                    onClick={handleAdd}
                >
                    <FaPlus style={{ marginRight: '8px' }} /> Add Book
                </Button>
            </Flex>

            <Table.Root variant="outline">
                <Table.Header>
                    <Table.Row bg="gray.100">
                        <Table.ColumnHeader color="gray.700" fontWeight="bold">Name</Table.ColumnHeader>
                        <Table.ColumnHeader color="gray.700" fontWeight="bold">Description</Table.ColumnHeader>
                        <Table.ColumnHeader color="gray.700" fontWeight="bold">Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data?.books && data.books.length > 0 ? (
                        data.books.map((book: any) => (
                            <Table.Row key={book.id}>
                                <Table.Cell color="gray.800" fontWeight="bold">{book.name}</Table.Cell>
                                <Table.Cell color="gray.600">{book.description}</Table.Cell>
                                <Table.Cell>
                                    <IconButton
                                        aria-label="Edit"
                                        mr="2"
                                        size="sm"
                                        bg="blue.500"
                                        color="white"
                                        _hover={{ bg: "blue.600" }}
                                        onClick={() => handleEdit(book)}
                                    >
                                        <FaEdit />
                                    </IconButton>
                                    <IconButton
                                        aria-label="Delete"
                                        size="sm"
                                        bg="red.500"
                                        color="white"
                                        _hover={{ bg: "red.600" }}
                                        onClick={() => handleDelete(book.id)}
                                    >
                                        <FaTrash />
                                    </IconButton>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan={3}>
                                <Center py="8">
                                    <Text color="gray.500">No books found. Add your first book!</Text>
                                </Center>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>

            <BookModal isOpen={open} onClose={onClose} book={selectedBook} />
        </Box>
    );
};

export default Dashboard;
