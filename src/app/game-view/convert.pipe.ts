import { Pipe,PipeTransform  } from '@angular/core';
@Pipe({
  name: 'displayPipe',
})
export class displayPipe implements PipeTransform{
  transform(n: number) : string {
    return n == 1 ? "O" : n == -1 ? "X" : " "
  }
}
