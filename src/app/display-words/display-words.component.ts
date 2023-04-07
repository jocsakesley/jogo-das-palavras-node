import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-display-words',
  templateUrl: './display-words.component.html',
  styleUrls: ['./display-words.component.scss']
})
export class DisplayWordsComponent implements OnChanges {
  @Input() letter: string = "";
  letters: Array<string> = []
  public hidedWord: string = "";
  hided: Array<string> = []
  public word: string = "";
  public tip: string = "";
  choiceIndex: any;
  words: Array<{"palavra": string, "dica": string}> | undefined

  oldWords: Array<string> | undefined
  @Output() clearLetter = new EventEmitter<boolean>()

  constructor(private getDataService: GetDataService) {}

  getWord() {
    this.clearAll()
    
    this.words = this.getDataService.getData()
    this.choiceIndex = Math.floor(Math.random() * this.words.length)
    let choicedWord = this.words[this.choiceIndex].palavra.toUpperCase()
    
    if (this.oldWords?.includes(choicedWord)) {
      this.getWord()
    }
    this.hidedWord =  "-".repeat(choicedWord.length)
    this.word = choicedWord

    this.oldWords?.push(choicedWord)
  }

  clear() {
    this.clearLetter.emit(true)
  }

  clearAll() {
    this.letter = "";
    this.letters = []
    this.hidedWord = "";
    this.hided = []
    this.word = "";
    this.tip = "";
    this.choiceIndex;
    this.words = undefined
    this.clear()
  }

  showTip() {
    if (this.words) {
      this.tip = this.words[this.choiceIndex].dica.trim()
    }
  }
  revelWord() {
    console.log(this.hided)
    let letA = ["Ã", "Á", "Â"]
    let letE = ["É", "Ê"]
    let letI = ["Í"]
    let letO = ["Õ", "Ó", "Ô"]
    let letU = ["Ú"]
    let letC = ["Ç"]
    for (let l = 0; l < this.word.length; l++) {
      if (
        this.word[l] === this.letter || 
        (letA.includes(this.word[l]) && this.letter === "A") || 
        (letE.includes(this.word[l]) && this.letter === "E")||
        (letI.includes(this.word[l]) && this.letter === "I")||
        (letO.includes(this.word[l]) && this.letter === "O")||
        (letU.includes(this.word[l]) && this.letter === "U")||
        (letC.includes(this.word[l]) && this.letter === "C")
        ) {
        this.letters.push(this.letter)
        this.hided[l] = this.word[l]
      } else if (this.word[l] === " ") {
        this.hided[l] = " "
      } else if (this.hided[l] === "-" || this.hided[l] == null) {
        this.hided[l] = "-"
      } 

    }

    this.hidedWord = this.hided.toString().replaceAll(",", "")
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.revelWord()
  }

  // ngOnInit(): void {
  //   this.getWord()
  // }
}
