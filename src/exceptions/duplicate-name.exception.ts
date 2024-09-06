import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateNameException extends HttpException {
  constructor(name: string) {
    super(`The name ${name} already exits`, HttpStatus.BAD_REQUEST);
  }
}
