import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <app-title></app-title>
      <app-keyboard (newLetter)="setLetter($event)" [clear]="clear"></app-keyboard>
      <app-display-words (clearLetter)="clearLetter($event)" [letter]="letter"></app-display-words>
      <router-outlet></router-outlet>
  `
})
export class AppComponent {

  @Input() public letter: any;
  @Input() public clear: any;
  public setLetter(event: string) {
    this.letter = event
  }

  public clearLetter(event: boolean) {
      this.clear = !this.clear
  }
}
