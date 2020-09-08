import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Book } from './types';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  getFilteredBooks(title: string, author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`, {
      params: {
        title,
        author,
      },
    });
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUrl}/books/${id}`);
  }

  createBook(book: Partial<Book>): Observable<{}> {
    return this.http.post<{}>(`${environment.apiUrl}/books`, book);
  }

  updateBook(book: Book): Observable<{}> {
    return this.http.put<{}>(`${environment.apiUrl}/books/${book.id}`, book);
  }

  deleteBook(book: Book): Observable<{}> {
    return this.http.delete<{}>(`${environment.apiUrl}/books/${book.id}`);
  }
}
