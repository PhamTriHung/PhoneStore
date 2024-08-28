import { PartialType } from '@nestjs/mapped-types';
import { District } from '../district.entity';

export class CreateDistrictDto extends PartialType(District) {
  name: string;
}
