
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
    @Field()
    name: string;

    @Field()
    description: string;
}

@InputType()
export class UpdateBookInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;
}
