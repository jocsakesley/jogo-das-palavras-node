import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnChanges{
  @Output() newLetter = new EventEmitter<string>()
  @Input() clear: boolean = true;
  

  public choicedLetters: Array<string> = []
  public letter: string = ""
  public handleLetter(event: Event) {
    this.letter = (event.target as HTMLInputElement).value

    this.newLetter.emit(this.letter)
    if (!this.choicedLetters.includes(this.letter)){
      this.choicedLetters.push(this.letter)
    }
    
    console.log(this.choicedLetters)

    let element = document.getElementsByName(this.letter)
    for (var i = 0; i< element.length; i++) {
      element[i].setAttribute("disabled", "true")
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.clear) {
      let element = document.getElementsByTagName("button")
      for (var i = 0; i< element.length; i++) {
        element[i].removeAttribute("disabled")
      }
    }
    
  }
  
}





