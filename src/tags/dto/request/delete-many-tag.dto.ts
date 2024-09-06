import { IsUUID } from 'class-validator';

export class DeleteManyTagDto {
  @IsUUID('4', { each: true })
  ids: string[];
}
