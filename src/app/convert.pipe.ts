import { Pipe,PipeTransform  } from '@angular/core';
@Pipe({
  name: 'displayPipe',
})
export class displayPipe implements PipeTransform{
  transform(val: number,marks:string[]) : string {
    return val == 1 ? marks[0] : val == -1 ? marks[1] : " "
  }
}
