interface SeedProduct {
  description: string;
  images?: string[];
  stock: number;
  price: number;
}

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

interface SeedData {
  users: SeedUser[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'user@gmail.com',
      fullName: 'common user',
      password: '$2a$12$kXBKAWuE9gwgg6Do4Qv7lOZRl2JzX3UH3RqUUerivRToMLwAHAYQG',
      roles: ['user'],
    },
    {
      email: 'admin@gmail.com',
      fullName: 'administrator',
      password: '$2a$12$kXBKAWuE9gwgg6Do4Qv7lOZRl2JzX3UH3RqUUerivRToMLwAHAYQG',
      roles: ['admin'],
    },
  ],
  products: [
    { description: "Diadema HyperX Cloud Stinger", price: 699.00, stock: 9 },
    { description: "Diadema JBL Tune 510BT Bluetooth", price: 1899.00, stock: 7 },
    { description: "Diadema JBL Quantum 600", price: 1999.00, stock: 9 },
    { description: "Teclado Gamer Razer V3 Mecánico", price: 2999.00, stock: 4 },
    { description: "Teclado gamer Corsair K60 RGB PRO", price: 1899.00, stock: 5 },
    { description: "Teclado HyperX Allow Core RGB", price: 899.00, stock: 3 },
    { description: "Mouse Razer Deathadder V2 Lite - Halo Edition Razer V2", price: 599.00, stock: 12 },
    { description: "Mouse HyperX Pulse Fire Core RGB", price: 599.00, stock: 6 },
    { description: "Microfono HyperX SoloCast", price: 649.00, stock: 2 },
    { description: "Monitor gamer LG 27UL500 27 Pulgadas", price: 5999.00, stock: 3 },
    { description: "Monitor Gamer 165hz Benq Mobiuz 27 Pulgadas", price: 6899.00, stock: 1 },
    { description: "Echo Dot 5.ª generación 2022 Alexa", price: 1299.00, stock: 1 },
  ],
};
