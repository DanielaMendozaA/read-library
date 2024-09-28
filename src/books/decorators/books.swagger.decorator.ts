import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery } from "@nestjs/swagger";


import { CreateBookDto } from "src/books/dto/create-book.dto";
import { ApiBadRequest, ApiCreated, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray } from "src/common/decorators/swagger.decorator";
import { UpdateBookDto } from "../dto/update-book.dto";


export function ApiDocGetAllBooks <T> (entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all books',
      description: 'Get all books from the library',
    }),
    ApiQuery({ name: 'author', required: false, description: 'Filter by author name', type: String }),
    ApiQuery({ name: 'category', required: false, description: 'Filter by book category', type: String }),
    ApiQuery({ name: 'publicationDate', required: false, description: 'Filter by books with a specify publication date', type: String }),
    ApiQuery({ name: 'publishedAfter', required: false, description: 'Filter by books published after a date', type: String }),
    ApiSuccessResponsesArray(entity),
    ApiBadRequest()
  );
}


export function ApiDocCreateBook <T> (entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Create a book',
            description: 'Create a new book in the library',
        }),
        ApiBody({
            type: CreateBookDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    );
}

export function ApiDocGetBookById <T> (entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Get a book by id',
            description: 'Get a book by its id',
        }),
        ApiSuccessResponses(entity),
        ApiNotFound(),
        ApiBadRequest()
    );
}

export function ApiQueryBooks() {
    return applyDecorators(
      ApiQuery({ name: 'title', required: false }),
      ApiQuery({ name: 'author', required: false }),
      ApiQuery({ name: 'category', required: false }),
      ApiQuery({ name: 'publicationDate', required: false }),
      ApiQuery({ name: 'publishedAfter', required: false }),
      ApiQuery({ name: 'limit', required: false, type: Number }),
      ApiQuery({ name: 'offset', required: false, type: Number }),
    );
  }

export function ApiDocUpdateBook <T> (entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Update a book',
            description: 'Update a book in the library',
        }),
        ApiBody({
            type: UpdateBookDto
        }),
        ApiSuccessResponses(entity),
        ApiNotFound(),
        ApiBadRequest()
    );
}

export function ApiDocDeleteBook<T> (entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete a book',
            description: 'Delete a book in the library',
        }),
        ApiSuccessResponses(entity),
        ApiNotFound(),
        ApiBadRequest()
    );



}