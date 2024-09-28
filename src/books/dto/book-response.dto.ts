import { ApiProperty } from "@nestjs/swagger";

import { Category } from "src/common/enum/category.enum";

export class BookResponseDto {
    @ApiProperty({ example: "66f7599dcf74f318452f8cda" })
    id: string;

    @ApiProperty({ example: 'La revelión de las ratas' })
    title: string;

    @ApiProperty({ example: '1970-05-12' })
    publicationDate: Date;

    @ApiProperty({ example: 'Fernando Soto Aparicio' })
    author: string;

    @ApiProperty({ example: ['Fantasy', 'Romance' ] })
    categories: Category[];

}