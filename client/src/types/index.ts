export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type Order = {
  id: string;
  userId: string;
  itemName: string;
  price: number;
  image: string;
  quantity: number;
  createdAt: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Hot Coffee' | 'Cold Coffee' | 'Pastries';
};
