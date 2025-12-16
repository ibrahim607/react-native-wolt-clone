import { orderService, OrderData } from '@/services/orderService';

describe('orderService', () => {
  const mockOrderData: OrderData = {
    items: [
      {
        dish: {
          id: 1,
          name: 'Test Pizza',
          description: 'Test description',
          price: 12.99,
          image: {} as any,
        },
        quantity: 2,
      },
    ],
    restaurantId: 'rest_001',
    deliveryMode: 'delivery',
    deliveryAddress: '123 Test St',
    leaveAtDoor: false,
    sendAsGift: false,
    deliveryTime: 'standard',
    tipAmount: 2.0,
    paymentMethod: 'applepay',
    subtotal: 25.98,
    serviceFee: 0.83,
    deliveryFee: 1.9,
    total: 30.71,
  };

  describe('createOrder', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(console, 'log').mockImplementation();
    });

    it('creates order successfully', async () => {
      const result = await orderService.createOrder(mockOrderData);
      
      expect(result).toHaveProperty('orderId');
      expect(result).toHaveProperty('success');
      expect(result.success).toBe(true);
      expect(result.orderId).toMatch(/^ORDER_/);
    });

    it('returns order ID with correct format', async () => {
      const result = await orderService.createOrder(mockOrderData);
      expect(result.orderId).toMatch(/^ORDER_\d+$/);
    });

    it('logs order creation', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      await orderService.createOrder(mockOrderData);
      
      expect(consoleSpy).toHaveBeenCalledWith('Creating order:', mockOrderData);
    });

    it('simulates API delay', async () => {
      const startTime = Date.now();
      await orderService.createOrder(mockOrderData);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
    });

    it('handles delivery mode', async () => {
      const deliveryOrder = { ...mockOrderData, deliveryMode: 'delivery' as const };
      const result = await orderService.createOrder(deliveryOrder);
      expect(result.success).toBe(true);
    });

    it('handles pickup mode', async () => {
      const pickupOrder = { ...mockOrderData, deliveryMode: 'pickup' as const };
      const result = await orderService.createOrder(pickupOrder);
      expect(result.success).toBe(true);
    });

    it('handles leave at door option', async () => {
      const orderWithLeaveAtDoor = { ...mockOrderData, leaveAtDoor: true };
      const result = await orderService.createOrder(orderWithLeaveAtDoor);
      expect(result.success).toBe(true);
    });

    it('handles send as gift option', async () => {
      const giftOrder = { ...mockOrderData, sendAsGift: true };
      const result = await orderService.createOrder(giftOrder);
      expect(result.success).toBe(true);
    });

    it('handles scheduled delivery time', async () => {
      const scheduledOrder = {
        ...mockOrderData,
        deliveryTime: 'schedule' as const,
        selectedTimeSlot: '18:00-18:30',
      };
      const result = await orderService.createOrder(scheduledOrder);
      expect(result.success).toBe(true);
    });

    it('handles different payment methods', async () => {
      const applePayOrder = { ...mockOrderData, paymentMethod: 'applepay' as const };
      const cardOrder = { ...mockOrderData, paymentMethod: 'card' as const };
      
      const result1 = await orderService.createOrder(applePayOrder);
      const result2 = await orderService.createOrder(cardOrder);
      
      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
    });

    it('handles multiple items in order', async () => {
      const multiItemOrder = {
        ...mockOrderData,
        items: [
          mockOrderData.items[0],
          {
            dish: {
              id: 2,
              name: 'Test Pasta',
              description: 'Test pasta',
              price: 10.99,
              image: {} as any,
            },
            quantity: 1,
          },
        ],
      };
      
      const result = await orderService.createOrder(multiItemOrder);
      expect(result.success).toBe(true);
    });

    it('handles tip amount', async () => {
      const orderWithTip = { ...mockOrderData, tipAmount: 5.0 };
      const result = await orderService.createOrder(orderWithTip);
      expect(result.success).toBe(true);
    });

    it('handles zero tip amount', async () => {
      const orderWithNoTip = { ...mockOrderData, tipAmount: 0 };
      const result = await orderService.createOrder(orderWithNoTip);
      expect(result.success).toBe(true);
    });
  });

  describe('calculateFees', () => {
    it('calculates fees with default distance', () => {
      const fees = orderService.calculateFees(20.0);
      
      expect(fees).toHaveProperty('serviceFee');
      expect(fees).toHaveProperty('deliveryFee');
      expect(fees.serviceFee).toBe(0.83);
    });

    it('calculates delivery fee for short distance (≤3km)', () => {
      const fees = orderService.calculateFees(20.0, 2.5);
      expect(fees.deliveryFee).toBe(1.9);
    });

    it('calculates delivery fee for exactly 3km', () => {
      const fees = orderService.calculateFees(20.0, 3.0);
      expect(fees.deliveryFee).toBe(1.9);
    });

    it('calculates delivery fee for long distance (>3km)', () => {
      const fees = orderService.calculateFees(20.0, 5.0);
      // 1.9 + (5 - 3) * 0.5 = 1.9 + 1.0 = 2.9
      expect(fees.deliveryFee).toBe(2.9);
    });

    it('calculates delivery fee for very long distance', () => {
      const fees = orderService.calculateFees(20.0, 10.0);
      // 1.9 + (10 - 3) * 0.5 = 1.9 + 3.5 = 5.4
      expect(fees.deliveryFee).toBe(5.4);
    });

    it('returns fixed service fee regardless of cart total', () => {
      const fees1 = orderService.calculateFees(10.0, 2.0);
      const fees2 = orderService.calculateFees(50.0, 2.0);
      const fees3 = orderService.calculateFees(100.0, 2.0);
      
      expect(fees1.serviceFee).toBe(0.83);
      expect(fees2.serviceFee).toBe(0.83);
      expect(fees3.serviceFee).toBe(0.83);
    });

    it('rounds fees to 2 decimal places', () => {
      const fees = orderService.calculateFees(20.0, 4.3);
      
      expect(fees.serviceFee.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
      expect(fees.deliveryFee.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });

    it('handles zero cart total', () => {
      const fees = orderService.calculateFees(0, 2.0);
      expect(fees.serviceFee).toBe(0.83);
      expect(fees.deliveryFee).toBe(1.9);
    });

    it('handles very large cart total', () => {
      const fees = orderService.calculateFees(1000.0, 2.0);
      expect(fees.serviceFee).toBe(0.83);
      expect(fees.deliveryFee).toBe(1.9);
    });

    it('handles zero distance', () => {
      const fees = orderService.calculateFees(20.0, 0);
      expect(fees.deliveryFee).toBe(1.9);
    });

    it('calculates fees for various distances', () => {
      const distances = [1, 2, 3, 4, 5, 10, 20];
      
      distances.forEach((distance) => {
        const fees = orderService.calculateFees(20.0, distance);
        expect(fees).toHaveProperty('serviceFee');
        expect(fees).toHaveProperty('deliveryFee');
        expect(fees.serviceFee).toBeGreaterThan(0);
        expect(fees.deliveryFee).toBeGreaterThan(0);
      });
    });
  });

  describe('Edge cases', () => {
    it('handles negative cart total in fee calculation', () => {
      const fees = orderService.calculateFees(-10.0, 2.0);
      expect(fees.serviceFee).toBe(0.83);
      expect(fees.deliveryFee).toBe(1.9);
    });

    it('handles fractional distances', () => {
      const fees = orderService.calculateFees(20.0, 3.5);
      expect(fees.deliveryFee).toBe(2.15);
    });

    it('handles very small cart amounts', () => {
      const fees = orderService.calculateFees(0.01, 1.0);
      expect(fees.serviceFee).toBe(0.83);
    });
  });
});