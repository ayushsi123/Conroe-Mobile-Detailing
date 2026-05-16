export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: 'Interior' | 'Exterior' | 'Full Detail';
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  createdAt: any;
}
