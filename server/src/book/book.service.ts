
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Book } from './book.model';
import { CreateBookInput, UpdateBookInput } from './dto/book.inputs';

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<Book[]> {
        return this.prisma.book.findMany();
    }

    async create(data: CreateBookInput): Promise<Book> {
        return this.prisma.book.create({ data });
    }

    async update(id: number, data: UpdateBookInput): Promise<Book> {
        return this.prisma.book.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<Book> {
        return this.prisma.book.delete({ where: { id } });
    }
}

