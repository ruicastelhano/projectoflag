import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appToggleDisplay]'
})
export class ToggleDisplayDirective implements OnInit {
  @HostBinding('style.display') display = 'block';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  @HostListener('click') click(event: Event) {
    if (this.display === 'none') {
      this.display = 'block';
    }
    else {
      this.display = 'block';
    }
  }

}
