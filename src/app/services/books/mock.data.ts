import { Book } from './types';

export const mockTitleQuery = 'Wheel of Time';
export const mockAuthorQuery = 'Robert Jordan';

export const mockFilteredBooks = [
  {
    id: '3',
    name: 'Wheel of Time',
    author: 'Robert Jordan',
    publishDate: '‎January 15, 1990',
    isbn: '0812511816',
  },
];

export const mockBooks: Book[] = [
  {
    id: '1',
    name: 'Harry Potter',
    author: 'J. K. Rowling',
    publishDate: '‎26 June 1997',
    isbn: '9780545010221',
  },
  {
    id: '2',
    name: 'Mistborn',
    author: 'Brandon Sanderson',
    publishDate: '‎July 17, 2006',
    isbn: '0765350386',
  },
];

export const mockNewBook: Omit<Book, 'id'> = {
  name: 'Stormlight Archive',
  author: 'Brandon Sanderson',
  publishDate: '‎August 31, 2010',
  isbn: '1250776635',
};

export const mockBook: Book = {
  id: '5',
  ...mockNewBook,
};
