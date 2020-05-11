import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective implements OnInit, OnChanges {
  @Input() slugProduto: string;
  @Input() index: number;
  @Input() activeComparativo: number;
  aux: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
      switch (this.slugProduto) {
        case 'ind':
          this.aux = 'secondary';
          break;
        case 'pap':
          this.aux = 'primary';
          break;
        case 'pla':
          this.aux = 'warning';
          break;
        case 'vid':
          this.aux = 'success';
          break;
        case 'rub':
          this.aux = 'rub';
          break;
        case 'cj':
          this.aux = 'cj';
          break;
        case 'ofu':
          this.aux = 'ofu';
          break;
        default:
          this.aux = 'danger';
          break;
      }
      if (this.index === this.activeComparativo){
        this.renderer.removeClass(this.elRef.nativeElement, `btn-${this.aux}`);
        this.renderer.addClass(this.elRef.nativeElement, `btn-outline-${this.aux}`);
      }
      else {
        this.renderer.removeClass(this.elRef.nativeElement, `btn-outline-${this.aux}`);
        this.renderer.addClass(this.elRef.nativeElement, `btn-${this.aux}`);
      }
    }

  ngOnInit(): void {
  }
}

