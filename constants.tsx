
import { DonationPackage } from './types';

export const DONATION_PACKAGES: DonationPackage[] = [
  {
    id: 'starter',
    price: 50,
    childrenFed: 10,
    title: 'Nourish Starter',
    description: 'Provide a full day of nutritious meals to a classroom of children.',
    benefits: ['10 Hot Meals', 'Essential Nutrition', 'Digital Certificate'],
    color: 'emerald'
  },
  {
    id: 'medium',
    price: 150,
    childrenFed: 30,
    title: 'Family Ration Box',
    description: 'A complete monthly ration box for a family including rice, oil, and lentils.',
    benefits: ['30 Days of Food', 'Monthly Ration Kit', 'Field Verification Call'],
    color: 'purple'
  },
  {
    id: 'hero',
    price: 200,
    childrenFed: 40,
    title: 'Community Hero',
    description: 'Feed an entire community center of children for a week.',
    tag: 'Most Popular',
    benefits: ['40 Children Fed', 'Medical Suppliments', 'Impact Video Report'],
    color: 'orange'
  },
  {
    id: 'legacy',
    price: 300,
    childrenFed: 70,
    title: 'Legacy Builder',
    description: 'Create a long-term nutrition hub for 70 children including education support.',
    benefits: ['70 Children Fed', 'School Supplies included', 'Personalized Thank You Note'],
    color: 'blue'
  }
];

export const MONTHLY_REPORTS = [
  {
    month: 'May 2024',
    location: 'Dhaka Slums',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
    update: 'Successfully distributed 1,200 ration boxes. Each box provides 4 weeks of essential nutrition for a family of five.'
  },
  {
    month: 'April 2024',
    location: 'Rift Valley',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    update: 'New feeding center opened in the Rift Valley. Now serving 500 children daily hot meals.'
  },
  {
    month: 'March 2024',
    location: 'Beirut Outskirts',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop',
    update: 'Emergency winter aid distribution complete. Blankets and high-protein rations reached 300 families.'
  }
];
