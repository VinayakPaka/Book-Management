import { useEffect, useState } from 'react';
import {
    Dialog,
    Button,
    Input,
    Textarea,
    Box,
    Text,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client/react';
import { CREATE_BOOK, UPDATE_BOOK } from '../graphql/mutations';
import { GET_BOOKS } from '../graphql/queries';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    book?: { id: number; name: string; description: string } | null;
}

const BookModal: React.FC<Props> = ({ isOpen, onClose, book }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [createBook, { loading: creating }] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => {
            onClose();
        },
        onError: (err: any) => {
            console.error("Error creating book", err);
        }
    });

    const [updateBook, { loading: updating }] = useMutation(UPDATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => {
            onClose();
        },
        onError: (err: any) => {
            console.error("Error updating book", err);
        }
    });

    useEffect(() => {
        if (book) {
            setName(book.name);
            setDescription(book.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [book, isOpen]);

    const handleSubmit = () => {
        if (book) {
            updateBook({ variables: { id: book.id, input: { name, description } } });
        } else {
            createBook({ variables: { input: { name, description } } });
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => { if (!e.open) onClose() }}>
            <Dialog.Backdrop bg="blackAlpha.600" />
            <Dialog.Positioner>
                <Dialog.Content bg="white" borderRadius="lg" boxShadow="xl" p="4">
                    <Dialog.Header>
                        <Dialog.Title color="gray.800" fontWeight="bold" fontSize="xl">
                            {book ? 'Edit Book' : 'Add Book'}
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CloseTrigger />
                    <Dialog.Body>
                        <Box mb="4">
                            <Text mb="2" color="gray.700" fontWeight="medium">Name</Text>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                bg="gray.50"
                                borderColor="gray.300"
                                color="gray.800"
                                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal" }}
                            />
                        </Box>
                        <Box>
                            <Text mb="2" color="gray.700" fontWeight="medium">Description</Text>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                bg="gray.50"
                                borderColor="gray.300"
                                color="gray.800"
                                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal" }}
                            />
                        </Box>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            mr={3}
                            borderColor="gray.300"
                            color="gray.600"
                            _hover={{ bg: "gray.100" }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg="teal.500"
                            color="white"
                            _hover={{ bg: "teal.600" }}
                            onClick={handleSubmit}
                            loading={creating || updating}
                            disabled={creating || updating}
                        >
                            Save
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};

export default BookModal;
