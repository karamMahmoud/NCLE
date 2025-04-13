import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SubscriptionComponent } from './subscription.component';
import { BehaviorSubject } from 'rxjs';

describe('SubscriptionComponent', () => {
  let component: SubscriptionComponent;
  let fixture: ComponentFixture<SubscriptionComponent>;

  beforeEach(async () => {
    const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    const platformSpy = jasmine.createSpyObj('Platform', {
      ready: Promise.resolve(),
      is: () => true,
      backButton: new BehaviorSubject({ subscribeWithPriority: () => {} })
    });

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot({
          _testing: true
        }),
        FormsModule,
        SubscriptionComponent
      ],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: Platform, useValue: platformSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form data', () => {
    expect(component.formData.name).toBe('');
    expect(component.formData.email).toBe('');
    expect(component.formData.childName).toBe('');
    expect(component.formData.dateOfBirth.date).toBe('');
    expect(component.formData.dateOfBirth.month).toBe('');
    expect(component.formData.dateOfBirth.year).toBe('');
    expect(component.formData.grade).toBe('');
    expect(component.formData.gender).toBe('');
    expect(component.formData.topics).toEqual([]);
  });

  it('should have correct summary values', () => {
    expect(component.summary.boxPrice).toBe(456);
    expect(component.summary.shipping).toBe('Free');
    expect(component.summary.tax).toBe(4.0);
    expect(component.summary.total).toBe(460);
  });

  it('should have all months in the dropdown', () => {
    expect(component.months.length).toBe(12);
    expect(component.months[0].name).toBe('January');
    expect(component.months[11].name).toBe('December');
  });

  it('should have correct available topics', () => {
    expect(component.availableTopics).toContain('Arabic');
    expect(component.availableTopics).toContain('Islamic');
    expect(component.availableTopics).toContain('English');
    expect(component.availableTopics).toContain('History');
    expect(component.availableTopics).toContain('Sports');
  });

  describe('Topic Selection', () => {
    it('should allow selecting up to 3 topics', () => {
      component.selectTopic('Arabic');
      component.selectTopic('Islamic');
      component.selectTopic('English');
      
      expect(component.selectedTopics.length).toBe(3);
      expect(component.selectedTopics).toContain('Arabic');
      expect(component.selectedTopics).toContain('Islamic');
      expect(component.selectedTopics).toContain('English');
    });

    it('should not allow selecting more than 3 topics', () => {
      component.selectTopic('Arabic');
      component.selectTopic('Islamic');
      component.selectTopic('English');
      component.selectTopic('History');
      
      expect(component.selectedTopics.length).toBe(3);
      expect(component.selectedTopics).not.toContain('History');
    });

    it('should allow deselecting topics', () => {
      component.selectTopic('Arabic');
      component.selectTopic('Islamic');
      component.selectTopic('Arabic');
      
      expect(component.selectedTopics.length).toBe(1);
      expect(component.selectedTopics).not.toContain('Arabic');
      expect(component.selectedTopics).toContain('Islamic');
    });

    it('should correctly check if topic is selected', () => {
      component.selectTopic('Arabic');
      
      expect(component.isTopicSelected('Arabic')).toBeTrue();
      expect(component.isTopicSelected('Islamic')).toBeFalse();
    });
  });

  describe('Form Elements', () => {
    it('should have all required form sections', () => {
      const formSections = fixture.nativeElement.querySelectorAll('.form-section');
      expect(formSections.length).toBe(3);
    });

    it('should have gender selection buttons', () => {
      const genderButtons = fixture.nativeElement.querySelectorAll('.gender-buttons button');
      expect(genderButtons.length).toBe(2);
    });

    it('should have date of birth selectors', () => {
      const dateSelects = fixture.nativeElement.querySelectorAll('.date-inputs select');
      expect(dateSelects.length).toBe(3);
    });
  });

  describe('Summary Section', () => {
    it('should display correct price breakdown', () => {
      const priceElements = fixture.nativeElement.querySelectorAll('.total-row');
      expect(priceElements.length).toBe(4);
    });

    it('should have continue to payment button', () => {
      const continueButton = fixture.nativeElement.querySelector('.continue-btn');
      expect(continueButton).toBeTruthy();
      expect(continueButton.textContent).toContain('Continue to Payment');
    });
  });
}); 