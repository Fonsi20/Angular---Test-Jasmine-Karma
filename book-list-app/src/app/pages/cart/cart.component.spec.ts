import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CartComponent } from './cart.component';

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

describe('Cart Component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let bookService: BookService;

  // Configuración del test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  // Instanciar el componente
  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    bookService = fixture.debugElement.injector.get(BookService);

    // Esta linea es para que se lanze el OnInit
    fixture.detectChanges();

    //Para que nuestro método OnInit no llame al servicio.
    spyOn(bookService, 'getBooksFromCart').and.callFake(() => listBook);
  });

  // Aqui van los test concretos, cada IT es un test, LOS TEST NUNCA SE LANZA EN ORDEN
  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // Test a un método con return
  it('getTotalPrice returns an amount', () => {
    const totalPrice = component.getTotalPrice(listBook);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBeNaN();
    expect(totalPrice).not.toBeUndefined();
    expect(totalPrice).not.toBeNull();
  });

  // Test a un método sin return
  it('onInputNumberChange without return - Increment Correctly', () => {
    const action = 'plus';
    const book = {
      name: '',
      author: '',
      isbn: '',
      price: 12.05,
      amount: 2,
    };

    // formas malas
    // const service = (component as any)._bookService;
    // const service2 = component['_bookService'];

    // formas buenas, tambien lo puedes declarar en el beforeEach, como lo dejo hecho para poder usarlo en todo el specs
    // const service = fixture.debugElement.injector.get(BookService);

    // Creamos a un espia para saber si se llama al método y ademas haz una llamda falsa que retorna null
    const spy1 = spyOn(bookService, 'updateAmountBook').and.callFake(
      () => null
    );
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    expect(book.amount).toBe(2);

    component.onInputNumberChange(action, book);

    expect(book.amount === 3).toBeTrue();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  // Test a un método sin return
  it('onInputNumberChange without return - Decrement Correctly', () => {
    const action = 'minus';
    const book = {
      name: '',
      author: '',
      isbn: '',
      price: 12.05,
      amount: 3,
    };

    const spy1 = spyOn(bookService, 'updateAmountBook').and.callFake(
      () => null
    );
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    expect(book.amount).toBe(3);

    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(2);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  // Test a un método PRIVADO desde un método PUBLICO,
  // Lo correcto es siempre llamar al método publico que llama al privado, no al privado directamente, aunque se puede hacer
  it('onClearBooks PUBLIC METHOD TO PRIVATE METHOD - Works Correctly', () => {
    component.listCartBook = listBook;

    // No hace falta hacer un and.callFake pues es un método dentro de nuestro componente.
    // Si se lo pusiesemos nunca llamaría al método y no se vaciaría la lista.
    // Con el and.callThrough le indicamos que si va a llamar
    const spy1 = spyOn(
      component as any,
      '_clearListCartBook'
    ).and.callThrough();

    const spy2 = spyOn(bookService, 'removeBooksFromCart').and.callFake(
      () => null
    );

    console.log('Before ' + component.listCartBook.length);

    component.onClearBooks();

    console.log('After ' + component.listCartBook.length);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(component.listCartBook.length).toBe(0);
    expect(component.listCartBook.length === 0).toBeTrue();
  });

  // Test a un método PRIVADO DIRECTAMENTE
  // NO RECOMENDADO
  it('_clearListCartBook PRIVATE METHOD - Works Correctly', () => {
    const spy1 = spyOn(bookService, 'removeBooksFromCart').and.callFake(
      () => null
    );

    component.listCartBook = listBook;
    component['_clearListCartBook']();

    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalled();
  });
});
