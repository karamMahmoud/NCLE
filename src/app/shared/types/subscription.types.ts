export interface Month {
  value: string;
  name: string;
}

export interface DateOfBirth {
  date: string;
  month: string;
  year: string;
}

export interface SubscriptionFormData {
  name: string;
  email: string;
  childName: string;
  dateOfBirth: DateOfBirth;
  grade: string;
  gender: string;
  topics: string[];
}

export interface SubscriptionSummary {
  boxPrice: number;
  shipping: string;
  tax: number;
  total: number;
}

export interface SubscriptionState {
  formData: SubscriptionFormData;
  summary: SubscriptionSummary;
  selectedTopics: string[];
  availableTopics: string[];
} 