import { HttpClientModule } from '@angular/common/http';
import { BooksService } from './books.service';
import { TestBed } from '@angular/core/testing';
import { PactWeb, Matchers } from '@pact-foundation/pact-web';
import {
  mockAuthorQuery,
  mockBook,
  mockBooks,
  mockNewBook,
  mockTitleQuery,
} from './mock.data';

describe('BooksService Pact', () => {
  let provider: PactWeb;
  let service: BooksService;

  beforeEach(async () => {
    provider = new PactWeb({
      consumer: 'pact-example',
      provider: 'some-provider',
      port: 1234,
      cors: true,
    } as any);

    await provider.removeInteractions();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksService],
      imports: [HttpClientModule],
    });

    service = TestBed.inject(BooksService);
  });

  describe('getBooks', () => {
    it('should receive the full list of books', async () => {
      await provider.addInteraction({
        state: 'has books in library',
        uponReceiving: 'a request for all the books in the library',
        withRequest: {
          method: 'GET',
          path: '/books',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: Matchers.somethingLike(mockBooks),
        },
      });

      const response = await service.getBooks().toPromise();

      expect(response).toEqual(mockBooks);
    });
  });

  describe('getBooks', () => {
    it('should receive a filtered list of books', async () => {
      await provider.addInteraction({
        state: 'has books in library',
        uponReceiving: 'a request for specific books in the library',
        withRequest: {
          method: 'GET',
          path: '/books',
          query: {
            title: Matchers.somethingLike(mockTitleQuery),
            author: Matchers.somethingLike(mockAuthorQuery),
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: Matchers.somethingLike(mockBooks),
        },
      });

      const response = await service
        .getFilteredBooks(mockTitleQuery, mockAuthorQuery)
        .toPromise();

      expect(response).toEqual(mockBooks);
    });
  });

  describe('getBook', () => {
    it('should receive the specified book', async () => {
      await provider.addInteraction({
        state: 'has specific book in library',
        uponReceiving: 'a request for a specific book',
        withRequest: {
          method: 'GET',
          path: `/books/${mockBook.id}`,
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: Matchers.somethingLike(mockBook),
        },
      });

      const response = await service.getBook(mockBook.id).toPromise();

      expect(response).toEqual(mockBook);
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      await provider.addInteraction({
        state: 'does not have the book in library',
        uponReceiving: 'a request for adding a book to the library',
        withRequest: {
          method: 'POST',
          path: `/books`,
          body: Matchers.somethingLike(mockNewBook),
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {},
        },
      });

      const response = await service.createBook(mockNewBook).toPromise();

      expect(response).toEqual({});
    });
  });

  describe('updateBook', () => {
    it('should update an existing book', async () => {
      await provider.addInteraction({
        state: 'the specified book exists in the library',
        uponReceiving: 'a request for updating a book in the library',
        withRequest: {
          method: 'PUT',
          path: `/books/${mockBook.id}`,
          body: Matchers.somethingLike(mockBook),
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {},
        },
      });

      const response = await service.updateBook(mockBook).toPromise();

      expect(response).toEqual({});
    });
  });

  describe('deleteBook', () => {
    it('should delete an existing book', async () => {
      await provider.addInteraction({
        state: 'the specified book exists in the library',
        uponReceiving: 'a request to delete the specified book',
        withRequest: {
          method: 'DELETE',
          path: `/books/${mockBook.id}`,
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {},
        },
      });

      const response = await service.deleteBook(mockBook).toPromise();

      expect(response).toEqual({});
    });
  });

  afterEach(async () => await provider.verify());
  afterAll(async () => await provider.finalize());
});
