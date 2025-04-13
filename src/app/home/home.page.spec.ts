import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, Platform, IonRouterOutlet, Config } from '@ionic/angular';
import { HomePage } from './home.page';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;
  let platformSpy: jasmine.SpyObj<Platform>;
  let configSpy: jasmine.SpyObj<Config>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', [
      'navigate', 
      'createUrlTree',
      'serializeUrl',
      'parseUrl',
      'isActive'
    ]);
    routerSpy.createUrlTree.and.returnValue({} as UrlTree);
    routerSpy.serializeUrl.and.returnValue('');
    routerSpy.parseUrl.and.returnValue({} as UrlTree);
    routerSpy.isActive.and.returnValue(false);
    
    const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    platformSpy = jasmine.createSpyObj('Platform', ['ready', 'is']);
    platformSpy.ready.and.returnValue(Promise.resolve('ready'));
    platformSpy.is.and.returnValue(true);
    
    configSpy = jasmine.createSpyObj('Config', ['get']);
    configSpy.get.and.returnValue('md');

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule.forRoot({
          mode: 'md'
        }),
        RouterTestingModule.withRoutes([
          { path: '', component: HomePage },
          { path: 'subscription', component: {} as any }
        ]),
        HomePage,
        HeaderComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: Config, useValue: configSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
            parent: {},
            params: new BehaviorSubject({}),
            queryParams: new BehaviorSubject({}),
            fragment: new BehaviorSubject({}),
            data: new BehaviorSubject({}),
            outlet: '',
            component: null,
            routeConfig: null,
            root: null,
            firstChild: null,
            children: [],
            pathFromRoot: [],
            paramMap: new BehaviorSubject({}),
            queryParamMap: new BehaviorSubject({})
          }
        },
        {
          provide: IonRouterOutlet,
          useValue: {
            nativeEl: {},
            canGoBack: () => true
          }
        },
        {
          provide: APP_INITIALIZER,
          useFactory: () => () => platformSpy.ready(),
          multi: true
        }
      ]
    }).compileComponents();

    await platformSpy.ready();
    
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  beforeEach(async () => {
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    tick();
    expect(component).toBeTruthy();
  }));

  it('should have correct title', fakeAsync(() => {
    tick();
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain('Discover the magic of our surprise box');
  }));

  it('should have correct subtitle', fakeAsync(() => {
    tick();
    const subtitleElement = fixture.nativeElement.querySelector('.title-box p');
    expect(subtitleElement.textContent).toContain('Subscribe to our surprise subscription box and give you');
  }));

  it('should have three steps in how it works section', fakeAsync(() => {
    tick();
    const steps = fixture.nativeElement.querySelectorAll('.step');
    expect(steps.length).toBe(3);
  }));

  it('should have subscribe button with correct routerLink', fakeAsync(() => {
    tick();
    const subscribeButton = fixture.nativeElement.querySelector('.subscribe-btn');
    expect(subscribeButton.getAttribute('routerLink')).toBe('/subscription');
  }));
}); 