import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetTokensFilterDto {
  @IsOptional()
  @IsNotEmpty()
  userId: string;
}
