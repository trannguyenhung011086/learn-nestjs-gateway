import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders/orders.controller';
import { PaymentsController } from './payments/payments.controller';
import { OrdersService } from './orders/orders.service';
import { PaymentsService } from './payments/payments.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [OrdersController, PaymentsController],
  providers: [
    {
      provide: 'ORDER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('ORDER_SERVICE_HOST') || 'localhost',
            port: configService.get('ORDER_SERVICE_PORT') || '3001',
          },
        }),
    },
    OrdersService,
    PaymentsService,
  ],
})
export class AppModule {}
