import { Pipe,PipeTransform  } from '@angular/core';
@Pipe({
  name: 'winerPipe',
})
export class winerPipe implements PipeTransform{
  transform(n: number) : string {
    return n == 1 ? "O贏了!" : n == -1 
      ? "X贏了!" : n == 9 
        ? '平手~' : ' '
  }
}
