import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';

describe('OrdersController', () => {
  let controller: OrdersController;
  let spyOrderService: ClientProxy;

  beforeEach(async () => {
    const mockObservable = {
      toPromise: () => Promise.resolve('result'),
    };
    const OrderServiceProvider = {
      provide: 'ORDER_SERVICE',
      useFactory: () => ({
        send: jest.fn().mockImplementation(() => mockObservable),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrderServiceProvider],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    spyOrderService = module.get<ClientProxy>('ORDER_SERVICE');
  });

  it('should get order', async () => {
    await controller.getOrder({ orderId: '1234' });
    const toPromiseSpy = jest.spyOn(spyOrderService, 'send');
    expect(spyOrderService.send).toHaveBeenCalled();
    expect(toPromiseSpy).toHaveBeenCalled();
  });

  it('should create order', async () => {
    await controller.createOrder({
      userId: '1234',
      email: 'test@mail.com',
      amount: 1000,
    });
    const toPromiseSpy = jest.spyOn(spyOrderService, 'send');
    expect(spyOrderService.send).toHaveBeenCalled();
    expect(toPromiseSpy).toHaveBeenCalled();
  });

  it('should cancel order', async () => {
    await controller.cancelOrder(
      { orderId: '1234' },
      { userId: '123', reason: 'test', action: 'cancel' },
    );
    const toPromiseSpy = jest.spyOn(spyOrderService, 'send');
    expect(spyOrderService.send).toHaveBeenCalled();
    expect(toPromiseSpy).toHaveBeenCalled();
  });
});
