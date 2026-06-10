

export interface Notification {
  id: number;
  userId: number;
  type: 'orders' | 'offers' | 'updates';
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
}

export class Icons{
   orders = '🍽️'
  offers= '🎉'
  updates='ℹ️'
}