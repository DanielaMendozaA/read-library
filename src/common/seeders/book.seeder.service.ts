import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBookDto } from "src/books/dto/create-book.dto";
import { Books } from "src/books/schemas/book.schema";
import { Category } from "src/common/enum/category.enum";

@Injectable()
export class BookSeeder {
  private readonly logger = new Logger(BookSeeder.name);

  constructor(
    @InjectModel(Books.name) private readonly booksModel: Model<Books>,
  ) {}

  async run(): Promise<void> {
    const books: CreateBookDto[] = [
      {
        title: "To Kill a Mockingbird",
        publicationDate: new Date("1960-07-11"),
        author: "Harper Lee",
        categories: [Category.FICTION, Category.HISTORY]
      },
      {
        title: "Sapiens: A Brief History of Humankind",
        publicationDate: new Date("2011-09-04"),
        author: "Yuval Noah Harari",
        categories: [Category.NON_FICTION, Category.HISTORY, Category.SCIENCE]
      },
      {
        title: "1984",
        publicationDate: new Date("1949-06-08"),
        author: "George Orwell",
        categories: [Category.FICTION, Category.SCIENCE]
      },
      {
        title: "The Hobbit",
        publicationDate: new Date("1937-09-21"),
        author: "J.R.R. Tolkien",
        categories: [Category.FANTASY, Category.FICTION]
      },
      {
        title: "Educated",
        publicationDate: new Date("2018-02-20"),
        author: "Tara Westover",
        categories: [Category.BIOGRAPHY, Category.EDUCATION]
      },
      {
        title: "Becoming",
        publicationDate: new Date("2018-11-13"),
        author: "Michelle Obama",
        categories: [Category.BIOGRAPHY, Category.NON_FICTION]
      },
      {
        title: "The Girl with the Dragon Tattoo",
        publicationDate: new Date("2005-08-23"),
        author: "Stieg Larsson",
        categories: [Category.MYSTERY, Category.FICTION]
      },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        publicationDate: new Date("1997-06-26"),
        author: "J.K. Rowling",
        categories: [Category.FANTASY, Category.YOUNG_ADULT]
      },
      {
        title: "The Da Vinci Code",
        publicationDate: new Date("2003-03-18"),
        author: "Dan Brown",
        categories: [Category.FICTION, Category.MYSTERY]
      },
      {
        title: "Pride and Prejudice",
        publicationDate: new Date("1813-01-28"),
        author: "Jane Austen",
        categories: [Category.ROMANCE, Category.FICTION]
      },
      {
        title: "The Shining",
        publicationDate: new Date("1977-01-28"),
        author: "Stephen King",
        categories: [Category.HORROR, Category.FICTION]
      },
      {
        title: "The Power of Habit",
        publicationDate: new Date("2012-02-28"),
        author: "Charles Duhigg",
        categories: [Category.SELF_HELP, Category.NON_FICTION]
      },
      {
        title: "The Alchemist",
        publicationDate: new Date("1988-04-05"),
        author: "Paulo Coelho",
        categories: [Category.FICTION, Category.FANTASY]
      },
      {
        title: "Fahrenheit 451",
        publicationDate: new Date("1953-10-19"),
        author: "Ray Bradbury",
        categories: [Category.FICTION, Category.SCIENCE]
      },
      {
        title: "The Catcher in the Rye",
        publicationDate: new Date("1951-07-16"),
        author: "J.D. Salinger",
        categories: [Category.FICTION, Category.YOUNG_ADULT]
      },
      {
        title: "The Road",
        publicationDate: new Date("2006-09-26"),
        author: "Cormac McCarthy",
        categories: [Category.FICTION, Category.HORROR]
      },
      {
        title: "The Body Keeps the Score",
        publicationDate: new Date("2014-09-25"),
        author: "Bessel van der Kolk",
        categories: [Category.HEALTH, Category.NON_FICTION]
      },
      {
        title: "How to Win Friends and Influence People",
        publicationDate: new Date("1936-10-01"),
        author: "Dale Carnegie",
        categories: [Category.SELF_HELP, Category.NON_FICTION]
      },
      {
        title: "The Silent Patient",
        publicationDate: new Date("2019-02-05"),
        author: "Alex Michaelides",
        categories: [Category.MYSTERY, Category.FICTION]
      },
      {
        title: "The Secret Garden",
        publicationDate: new Date("1911-08-01"),
        author: "Frances Hodgson Burnett",
        categories: [Category.FICTION, Category.CHILDREN]
      },
      {
        title: "Gone Girl",
        publicationDate: new Date("2012-06-05"),
        author: "Gillian Flynn",
        categories: [Category.MYSTERY, Category.FICTION]
      },
      {
        title: "The Hunger Games",
        publicationDate: new Date("2008-09-14"),
        author: "Suzanne Collins",
        categories: [Category.YOUNG_ADULT, Category.FICTION]
      },
      {
        title: "Goodnight Moon",
        publicationDate: new Date("1947-09-03"),
        author: "Margaret Wise Brown",
        categories: [Category.CHILDREN, Category.FICTION]
      },
      {
        title: "A Brief History of Time",
        publicationDate: new Date("1988-04-01"),
        author: "Stephen Hawking",
        categories: [Category.NON_FICTION, Category.SCIENCE]
      },
      {
        title: "Love in the Time of Cholera",
        publicationDate: new Date("1985-09-15"),
        author: "Gabriel García Márquez",
        categories: [Category.ROMANCE, Category.FICTION]
      }
    ];

    try {
      await this.booksModel.insertMany(books);
      this.logger.log('Books seeding completed successfully!');
    } catch (error) {
      this.logger.error('Failed to seed books:', error);
    }
  }
}
