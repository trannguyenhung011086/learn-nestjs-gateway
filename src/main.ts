import 'source-map-support/register';
import {
  BadGatewayException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        console.log(errors);
        return new BadGatewayException(errors);
      },
    }),
  );
  app.listen(port, () =>
    console.log(`Gateway service is running on port ${port}`),
  );
}
bootstrap();
