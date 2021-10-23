import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { swal } from 'sweetalert2';

import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';
import { BookService } from './book.service';

const listBook: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 12.05,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20.86,
    amount: 5,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 6.2,
    amount: 3,
  },
];

const book: Book = {
  name: '',
  author: '',
  isbn: '',
  price: 12.05,
  amount: 2,
};

describe('bookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    // desde la version 9 de angular es inject
    //service = TestBed.inject(BookService);
    // inferior a la version 9 de angular es inject
    service = TestBed.get(BookService);
    httpMock = TestBed.get(HttpTestingController);

    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] ? storage[key] : null;
    });

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        return (storage[key] = value);
      }
    );
  });

  // El tutor solo lo usa en servicios que hace peticiones a API's
  afterEach(() => {
    // Para comprobar que no hay peticiones pendientes entre cada test.
    httpMock.verify();
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  // Comprobar una peticion get, pero seria lo mismo para post o así
  it('getBook return a list of books and does a get method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBook);
    });
    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBook);
  });

  // Comprobar sobre localstorage, solo comprueba si está vacio
  it('getBooksFromCart get books from the localstorage - return empty when localstorage is empty', () => {
    const listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });

  it('addBookToCart add books from the localstorage - add the book if dosent exist in the localstorage and a second one', () => {
    const toast = {
      fire: () => null,
    } as any;
    const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
      return toast;
    });

    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(2);
    expect(spy1).toHaveBeenCalled();
  });

  // Elimina la lista de libros del localstorage
  it('removeBooksFromCart get books from the localstorage - return empty when localstorage is empty', () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.removeBooksFromCart();
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });
});
