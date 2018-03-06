import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/** trusts the incoming html as safe. uses bypassSecurityTrustHtml */
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  /** Injects DomSanitizer */
  constructor(private sanitized: DomSanitizer) {
  }
  /** Transforms the html value */
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
