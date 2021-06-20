import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CancelOrderDto } from './dtos/cancelOrder.dto';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { GetOrderDto } from './dtos/getOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderServiceClient: ClientProxy,
  ) {}

  // async onApplicationBootstrap() {
  //   await this.orderServiceClient.connect();
  // }

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    const res = await this.orderServiceClient
      .send({ cmd: 'create_order' }, body)
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });

    console.log('Create order...', res);

    return res;
  }

  @Put('/:orderId')
  async cancelOrder(
    @Param() params: GetOrderDto,
    @Body() body: CancelOrderDto,
  ) {
    const res = await this.orderServiceClient
      .send(
        { cmd: 'cancel_order' },
        { userId: body.userId, orderId: params.orderId, reason: body.reason },
      )
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });

    console.log('Cancel order...', res);

    return res;
  }

  @Get('/:orderId')
  async getOrder(@Param() params: GetOrderDto) {
    const res = await this.orderServiceClient
      .send({ cmd: 'get_order' }, params)
      .toPromise();

    console.log('Get order...', res);

    return res;
  }
}
