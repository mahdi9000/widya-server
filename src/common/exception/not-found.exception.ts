import { NotFoundException } from '@nestjs/common';

export class CustomNotFoundException extends NotFoundException {
  constructor(errorName: string, id: string) {
    super(`${errorName} with id ${id} not found.`);
  }
}
