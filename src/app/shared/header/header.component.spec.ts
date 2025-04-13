import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    const platformSpy = jasmine.createSpyObj('Platform', {
      ready: Promise.resolve(),
      is: () => true,
      backButton: new BehaviorSubject({ subscribeWithPriority: () => {} })
    });

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        CommonModule,
        HeaderComponent
      ],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: Platform, useValue: platformSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    await fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have logo text', async () => {
    await fixture.detectChanges();
    const logoElement = fixture.nativeElement.querySelector('.logo-text');
    expect(logoElement).toBeTruthy();
    expect(logoElement.textContent.trim()).toBe('Surprise Box');
  });

  it('should have navigation menu', () => {
    const navElement = fixture.nativeElement.querySelector('.nav-menu');
    expect(navElement).toBeTruthy();
  });

  it('should have navigation links', () => {
    const navLinks = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(navLinks.length).toBeGreaterThan(0);
  });
});
