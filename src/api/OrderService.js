const ORDERS = [
  {
    id: "SH12345",
    date: "12 Aug 2025",
    status: "Delivered",
    total: 14997,
    images: ["/images/collections/bridal.png", "/images/collections/festive.png", "/images/collections/handloom.png"],
  },
  {
    id: "SH12344",
    date: "25 Jul 2025",
    status: "Shipped",
    total: 9998,
    images: ["/images/collections/party.png", "/images/collections/dailywear.png"],
  },
  {
    id: "SH12343",
    date: "10 Jul 2025",
    status: "Delivered",
    total: 6999,
    images: ["/images/collections/workwear.png"],
  },
];

// No order backend exists yet, so this resolves from mock data instead of
// calling an API — kept async and shaped like the eventual real call on
// purpose. When a backend is ready, swap the body for e.g. `return
// api.get(`${ORDER_SERVICE_URL}/mine`)`, mirroring src/api/CustomerService.js;
// account-dashboard already awaits this and needs no changes.
class OrderService {
  async getMyOrders() {
    return ORDERS;
  }
}

const orderService = new OrderService();

export default orderService;
