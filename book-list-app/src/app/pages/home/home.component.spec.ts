import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { HomeComponent } from './home.component';


// fit o fdescribe es solo para que SI se lanze ese test o esa descripcion
// xit o xdescribe es solo para que NO se lanze ese test o esa descripcion
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

const bookServiceMock = {
  getBooks:() => of(listBook);
}

@Pipe({name='reduceText'})
class ReduceTextPipeMock implements PipeTransform{
  transform(): string{
    return '';
  }
}

describe('Home Component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent,ReduceTextPipeMock],
      providers: [
        //BookService
        { provide: BookService, useValue: bookServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // Test unitario a una Subscription
  it('getBook get books from the subscription', () => {
    // const bookService = fixture.debugElement.injector.get(BookService);
    // const listBook: Book[] = [];
    // El of es para indicar que nos devuelve un observable de tipo array de book

    // El espia no hace falta si usamos un mock para el servicio
    // Normalmente usamos el mock si se trata de un servicio externo que no conocemos
    // const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));

    // Para que nos pare.
    debugger;
    component.getBooks();

    //expect(spy1).toHaveBeenCalled();
    expect(component.listBook.length).toBe(3);
  });
});
