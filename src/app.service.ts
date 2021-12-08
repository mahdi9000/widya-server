import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  pong(): any {
    return {pong: '🏓'};
  }
}
