import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Month, SubscriptionFormData, SubscriptionSummary, SubscriptionState } from '../shared/types/subscription.types';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SubscriptionComponent {
  months: Month[] = [
    { value: '1', name: 'January' },
    { value: '2', name: 'February' },
    { value: '3', name: 'March' },
    { value: '4', name: 'April' },
    { value: '5', name: 'May' },
    { value: '6', name: 'June' },
    { value: '7', name: 'July' },
    { value: '8', name: 'August' },
    { value: '9', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  formData: SubscriptionFormData = {
    name: '',
    email: '',
    childName: '',
    dateOfBirth: {
      date: '',
      month: '',
      year: ''
    },
    grade: '',
    gender: '',
    topics: []
  };

  summary: SubscriptionSummary = {
    boxPrice: 456,
    shipping: 'Free',
    tax: 4.0,
    total: 460
  };

  availableTopics: string[] = [
    'Arabic',
    'Islamic',
    'English',
    'History',
    'Sports'
  ];

  selectedTopics: string[] = [];

  selectTopic(topic: string) {
    const index = this.selectedTopics.indexOf(topic);
    if (index === -1 && this.selectedTopics.length < 3) {
      this.selectedTopics.push(topic);
    } else if (index !== -1) {
      this.selectedTopics.splice(index, 1);
    }
  }

  isTopicSelected(topic: string): boolean {
    return this.selectedTopics.includes(topic);
  }

  continueToPayment() {
    console.log('Form Data:', this.formData);
    console.log('Selected Topics:', this.selectedTopics);
    // Add payment navigation logic here
  }
} 