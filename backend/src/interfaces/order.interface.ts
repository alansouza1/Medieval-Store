interface Order {
  id?: number;
  userId: number;
  productsIds?: number[];
  productsNames?: string[];
}

export default Order;