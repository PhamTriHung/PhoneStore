import { PartialType } from '@nestjs/mapped-types';
import { Ward } from '../ward.entity';

export class CreateWardDto extends PartialType(Ward) {}
