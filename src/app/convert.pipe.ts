import { Pipe,PipeTransform  } from '@angular/core';
@Pipe({
  name: 'displayPipe',
})
export class displayPipe implements PipeTransform{
  // transform(val: number,markO:string,markX:string) : string {
  //   return val == 1 ? markO : val == -1 ? markX : " "
  // }
  transform(val: number,marks:string[]) : string {
    return val == 1 ? marks[0] : val == -1 ? marks[1] : " "
  }
}
