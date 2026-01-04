
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.model';
import { CreateBookInput, UpdateBookInput } from './dto/book.inputs';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => Book)
export class BookResolver {
    constructor(private readonly bookService: BookService) { }

    @Query(() => [Book])
    async books(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Mutation(() => Book)
    @UseGuards(GqlAuthGuard)
    async createBook(@Args('input') input: CreateBookInput): Promise<Book> {
        return this.bookService.create(input);
    }

    @Mutation(() => Book)
    @UseGuards(GqlAuthGuard)
    async updateBook(
        @Args('id', { type: () => Int }) id: number,
        @Args('input') input: UpdateBookInput,
    ): Promise<Book> {
        return this.bookService.update(id, input);
    }

    @Mutation(() => Book)
    @UseGuards(GqlAuthGuard)
    async deleteBook(@Args('id', { type: () => Int }) id: number): Promise<Book> {
        return this.bookService.delete(id);
    }
}
