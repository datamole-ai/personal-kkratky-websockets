import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
  private sseSubject: Subject<{
    type: string;
    description: string;
  }> = new Subject();

  constructor(private eventEmitter: EventEmitter2) {}

  getSseSubject() {
    return this.sseSubject.asObservable();
  }

  registerRequestReceived(username: string) {
    this.eventEmitter.emit('request.received', username);
  }

  listenToEvents() {
    this.eventEmitter.on('request.received', (username) => {
      this.sseSubject.next({
        type: 'new registration',
        description: `Your app has new user: ${username} 🎉`,
      });
    });
  }
}
