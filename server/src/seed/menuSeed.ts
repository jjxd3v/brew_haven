import { MenuItem } from '../models/MenuItem.js';

export const MENU_ITEMS = [
  {
    id: '1',
    name: 'Espresso',
    description: 'A concentrated shot of our signature blend.',
    price: 3.5,
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop',
    category: 'Hot Coffee' as const,
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Espresso topped with deep layer of foamed milk.',
    price: 4.5,
    image:
      'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
    category: 'Hot Coffee' as const,
  },
  {
    id: '3',
    name: 'Latte',
    description: 'Espresso in steamed milk lightly topped with foam.',
    price: 4.75,
    image:
      'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800&auto=format&fit=crop',
    category: 'Hot Coffee' as const,
  },
  {
    id: '4',
    name: 'Iced Americano',
    description:
      'Espresso shots topped with cold water produce a light layer of crema.',
    price: 4.0,
    image:
      'https://images.unsplash.com/photo-1517701550927-30cfcb64c485?q=80&w=800&auto=format&fit=crop',
    category: 'Cold Coffee' as const,
  },
  {
    id: '5',
    name: 'Cold Brew',
    description: 'Steeped for 20 hours for a smooth, rich flavor.',
    price: 5.0,
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
    category: 'Cold Coffee' as const,
  },
  {
    id: '6',
    name: 'Iced Caramel Macchiato',
    description:
      'Espresso combined with vanilla-flavored syrup, milk and caramel drizzle.',
    price: 5.5,
    image:
      'https://images.unsplash.com/photo-1499961024600-ad094db305cc?q=80&w=800&auto=format&fit=crop',
    category: 'Cold Coffee' as const,
  },
  {
    id: '7',
    name: 'Butter Croissant',
    description: 'Flaky, buttery, and baked fresh daily.',
    price: 3.75,
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=800&auto=format&fit=crop',
    category: 'Pastries' as const,
  },
  {
    id: '8',
    name: 'Blueberry Muffin',
    description: 'Loaded with wild blueberries and topped with a sugar crust.',
    price: 3.5,
    image:
      'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=800&auto=format&fit=crop',
    category: 'Pastries' as const,
  },
];

export async function seedMenuItems() {
  for (const item of MENU_ITEMS) {
    await MenuItem.findOneAndUpdate({ id: item.id }, item, {
      upsert: true,
      new: true,
    });
  }
}
