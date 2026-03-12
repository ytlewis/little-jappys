export function saveToLocalStorage(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
}

export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error("Error reading from localStorage", e);
    return null;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing from localStorage", e);
  }
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Booking {
  sitterName: string;
  date: string;
  time: string;
  hours: number;
  yourName: string;
}

export interface DonationItem {
  id: string;
  donorName: string;
  itemName: string;
  condition: "Gently Used" | "Like New";
  createdAt: string;
}

export function getCart(): CartItem[] {
  return getFromLocalStorage<CartItem[]>("littlejappy_cart") || [];
}

export function addToCart(item: Omit<CartItem, "quantity">): void {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveToLocalStorage("littlejappy_cart", cart);
}

export function removeFromCart(id: string): void {
  const cart = getCart().filter((i) => i.id !== id);
  saveToLocalStorage("littlejappy_cart", cart);
}

export function clearCart(): void {
  removeFromLocalStorage("littlejappy_cart");
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getDonations(): DonationItem[] {
  return getFromLocalStorage<DonationItem[]>("littlejappy_donations") || [];
}

export function addDonation(item: Omit<DonationItem, "id" | "createdAt">): void {
  const donations = getDonations();
  donations.push({
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
  saveToLocalStorage("littlejappy_donations", donations);
}
