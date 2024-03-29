const mockData = {
  coupons: [
    {
      type: "정액제",
      amount: 50000,
      description: "5만원 할인쿠폰",
    },
    {
      type: "정률제",
      percentage: 30,
      description: "3월 기념 30% 할인쿠폰",
    },
    {
      type: "정률제",
      percentage: 10,
      description: "회원 정기 쿠폰 실버등급",
    },
  ],
  products: [
    {
      id: 1,
      name: "iPhone 13",
      price: 1000000,
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      price: 900000,
    },
    {
      id: 3,
      name: "Google Pixel 6",
      price: 800000,
    },
  ],
  productPrice: 1000000,
  deliveryFee: 2500,
  points: 100000,
};

export default mockData;
