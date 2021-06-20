import { IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  amount: number;
}
