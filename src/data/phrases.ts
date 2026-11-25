import { PhraseCategory, PhraseItem } from '../types';

export const CATEGORY_LABELS: Record<PhraseCategory, string> = {
  urgent: 'Urgent',
  needs: 'Daily Needs',
  responses: 'Quick Replies',
  feelings: 'Comfort & Feelings',
  custom: 'My Phrases',
};

export const DEFAULT_PHRASES: PhraseItem[] = [
  // Urgent
  { id: 'u1', text: 'I need help right now', category: 'urgent', urgent: true },
  { id: 'u2', text: 'I am in pain', category: 'urgent', urgent: true },
  { id: 'u3', text: 'Please call my caregiver', category: 'urgent', urgent: true },
  { id: 'u4', text: 'Please stop for a moment', category: 'urgent', urgent: true },
  { id: 'u5', text: 'I need my medication', category: 'urgent', urgent: true },
  { id: 'u6', text: 'Something feels uncomfortable', category: 'urgent', urgent: true },

  // Daily Needs
  { id: 'n1', text: 'I need water', category: 'needs' },
  { id: 'n2', text: 'I am hungry', category: 'needs' },
  { id: 'n3', text: 'I need to use the restroom', category: 'needs' },
  { id: 'n4', text: 'Please adjust my position', category: 'needs' },
  { id: 'n5', text: 'Please adjust the lights', category: 'needs' },
  { id: 'n6', text: 'I would like to rest now', category: 'needs' },

  // Quick Replies
  { id: 'r1', text: 'Yes', category: 'responses' },
  { id: 'r2', text: 'No', category: 'responses' },
  { id: 'r3', text: 'Thank you', category: 'responses' },
  { id: 'r4', text: 'Please wait a moment', category: 'responses' },
  { id: 'r5', text: 'Please repeat that', category: 'responses' },
  { id: 'r6', text: 'I understand', category: 'responses' },

  // Comfort & Feelings
  { id: 'f1', text: 'I feel good today', category: 'feelings' },
  { id: 'f2', text: 'I am tired', category: 'feelings' },
  { id: 'f3', text: 'I feel too cold', category: 'feelings' },
  { id: 'f4', text: 'I feel too warm', category: 'feelings' },
  { id: 'f5', text: 'Can we talk for a bit?', category: 'feelings' },
  { id: 'f6', text: 'I love you', category: 'feelings' },
];
