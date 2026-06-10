import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    const now = new Date();
    const date = new Date(value);

    const seconds = Math.floor(
      (now.getTime() - date.getTime()) / 1000
    );

    if (seconds < 60) {
      return 'Just now';
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) {
      return 'Yesterday';
    }

    if (days < 7) {
      return `${days} days ago`;
    }

    return date.toLocaleDateString();
  }
}