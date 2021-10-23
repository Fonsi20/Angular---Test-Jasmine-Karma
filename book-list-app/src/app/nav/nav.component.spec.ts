import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavComponent } from './nav.component';

class componentClassRouteTest {}

describe('Nav component', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  // Configuración del test
  // En este test vamos a comprobar las rutas, que se navega correctamente, entonces en vez de usar los componentes reales
  // usamos uno de mentira para comprobar solo las rutas.
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: componentClassRouteTest },
          { path: 'cart', component: componentClassRouteTest },
        ]),
      ],
      declarations: [NavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  // Instanciar el componente
  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;

    // Esta linea es para que se lanze el OnInit
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.navTo('home');
    expect(spy).toHaveBeenCalledWith(['/home']);
    component.navTo('cart');
    expect(spy).toHaveBeenCalledWith(['/cart']);
  });
});
