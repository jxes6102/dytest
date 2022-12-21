import { Pipe,PipeTransform  } from '@angular/core';
@Pipe({
  name: 'winerPipe',
})
export class winerPipe implements PipeTransform{
  transform(n: number,markO:string,markX:string) : string {
    return n === 1 ? markO + "贏了!" : n === -1
      ? markX + "贏了!" : n === 2
        ? '平手~' : '進行中'
  }
}
