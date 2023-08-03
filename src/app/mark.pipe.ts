import { Pipe,PipeTransform  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
  name: 'markPipe',
})
export class markPipe implements PipeTransform{
  constructor(private _sanitizer:DomSanitizer) {}
  transform(original: string,key:string) : SafeHtml  {
    let pattern = new RegExp('('+key+')', 'gi')
    original = original.replace(pattern, '<span style="color:red;">'+key+'</span>');
    return this._sanitizer.bypassSecurityTrustHtml(original)
  }
}
