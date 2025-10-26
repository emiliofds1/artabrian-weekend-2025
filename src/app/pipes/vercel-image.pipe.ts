import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'vercelImage'
})
export class VercelImagePipe implements PipeTransform {
  transform(src: string, width: number = 800, quality: number = 75): string {
    if (environment.env != "production") {
      return src;
    }

    if (!src.startsWith('/')) {
      src = '/' + src;
    }

    return `/__vercel/image?url=${src}&w=${width}&q=${quality}`;
  }
}
