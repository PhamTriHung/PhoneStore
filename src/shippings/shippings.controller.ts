import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shippings')
@Controller('shippings')
export class ShippingsController {}
