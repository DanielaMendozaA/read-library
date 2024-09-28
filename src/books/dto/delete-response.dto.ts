import { ApiProperty } from "@nestjs/swagger";

export class DeleteResponseDto {
    @ApiProperty({ example: "The book was deleted successfully" })
    message: string;
}