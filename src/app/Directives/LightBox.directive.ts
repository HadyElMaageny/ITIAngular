import { Directive, ElementRef, Host, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[lightBox]'
})
export class LightBoxDirective implements OnChanges {

  @Input('lightBox') highLightColor: string = 'yellow';
  @Input() defaultColor: string = 'darkblue';

  constructor(private elementRef: ElementRef) {
  }
  ngOnChanges(): void {
    this.elementRef.nativeElement.style.width = '200px';
    this.elementRef.nativeElement.style.height = '100px';
    this.elementRef.nativeElement.style.border = `5px solid ${this.defaultColor}`;
  }

  @HostListener('mouseover') onMouseOver() {
    this.elementRef.nativeElement.style.border = `5px solid ${this.highLightColor}`;
  }

  @HostListener('mouseout') onMouseOut() {
    this.elementRef.nativeElement.style.border = `5px solid ${this.defaultColor}`;
  }
}
