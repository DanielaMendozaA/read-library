import { Types } from "mongoose";
import { CreateBookDto } from "../dto/create-book.dto";
import { QueryDto } from "../dto/query.dto";
import { Books } from "../schemas/book.schema";
import { UpdateBookDto } from "../dto/update-book.dto";

export interface IBookService {
    create(createBookDto: CreateBookDto): Promise<Books>;
    findAllByQuerys(queryDto: QueryDto): Promise<Books[]>;
    GetById(id: Types.ObjectId): Promise<Books>;
    update(id: Types.ObjectId, updateBookDto: UpdateBookDto): Promise<Books>;
    remove(id: Types.ObjectId): Promise<Books>;

}