import { IsNotEmpty, IsString, Equals } from 'class-validator';

export class CancelOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Equals('cancel')
  action: string;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
