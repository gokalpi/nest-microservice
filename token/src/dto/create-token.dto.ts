import { IsNotEmpty } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  token: string;
}
