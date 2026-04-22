export type MenuItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
};

export const products: MenuItem[] = [
  {
    id: 1,
    title: "Biryani",
    description: "Aromatic rice dish layered with spiced meat and vegetables, served with raita.",
    price: 12.99,
    category: "Rice",
    emoji: "🍚",
  },
  {
    id: 2,
    title: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato-based sauce with aromatic spices.",
    price: 14.99,
    category: "Gravy",
    emoji: "🍲",
  },
  {
    id: 3,
    title: "Beef Nihari",
    description: "Slow-cooked beef in a rich, flavorful gravy with aromatic spices.",
    price: 13.49,
    category: "Gravy",
    emoji: "🍲",
  },
  {
    id: 4,
    title: "Chicken Pulao",
    description: "Aromatic rice dish layered with spiced chicken and vegetables, served with raita.",
    price: 12.99,
    category: "Rice",
    emoji: "🍚",
  },
  {
    id: 5,
    title: "Kulfi Falooda",
    description: "Traditional Indian dessert with vermicelli, nuts, and cardamom-flavored milk.",
    price: 6.99,
    category: "Dessert",
    emoji: "🍨",
  },
  {
    id: 6,
    title: "Kheer",
    description: "A creamy rice pudding sweetened with milk, sugar, and nuts.",
    price: 5.99,
    category: "Dessert",
    emoji: "🍚",
  },
];