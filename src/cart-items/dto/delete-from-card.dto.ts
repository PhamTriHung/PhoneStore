import { IsUUID } from 'class-validator';

export class DeleteFromCartDto {
  @IsUUID(4)
  userId: string;

  @IsUUID(4)
  productId: string;
}
