import { Controller, Sse, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService.listenToEvents();
  }

  @Sse('notifications')
  sse(): Observable<MessageEvent> {
    return this.appService
      .getSseSubject()
      .pipe(map((data) => ({ data }) as MessageEvent));
  }

  @Post('register')
  register(@Body() body: unknown) {
    const username = body['username'];
    if (typeof username === 'string') {
      this.appService.registerRequestReceived(username);

      return { message: `User ${username} created` };
    } else {
      return { message: 'Invalid username' };
    }
  }
}
