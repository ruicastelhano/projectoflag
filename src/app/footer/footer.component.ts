import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ano: number;

  constructor() {
    this.ano = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}
