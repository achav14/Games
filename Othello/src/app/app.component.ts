import { Component } from '@angular/core';
// import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Othello';
  boardView:string;
  boardStatus:string = ' ';
  currPlayer:string= 'X';
  turn:number = 0;
  xCount:number = 0;
  oCount:number = 0;
  playerPiecesArray:Array<string> = []
  coordsArray:Array<number> = [-1,0,1]
  boardArray =[[' ','A','B','C','D','E','F','G','H'],
          ['1',' ',' ',' ',' ',' ',' ',' ',' '],
          ['2',' ',' ',' ',' ',' ',' ',' ',' '],
          ['3',' ',' ',' ',' ',' ',' ',' ',' '],
          ['4',' ',' ',' ','X','O',' ',' ',' '],
          ['5',' ',' ',' ','O','X',' ',' ',' '],
          ['6',' ',' ',' ',' ',' ',' ',' ',' '],
          ['7',' ',' ',' ',' ',' ',' ',' ',' '],
          ['8',' ',' ',' ',' ',' ',' ',' ',' ']];

ngOnInit(){
  this.banner()
}

constructor(private toastr:ToastrService){

}
  
banner(){
  banner = " +================================================+
             |   /----\  ====+====  |      |  ==========  |       |
             |   |    |      |      |______|  |           |       |
             |   |    |      |      |      |  |======     |       |       
             |   \____/      |      |      |  |______     |_____  |____"
}

addPlayerPiece(x,y){
  this.boardArray[x][y] = this.currPlayer
}

toastMessage(message:string,title:string,timer:number = 5000){
  this.toastr.error(message, title,{timeOut:timer})
}

tileClick(x,y){
  if (this.boardArray[x][y] != ' ' || x == 0){
    this.toastMessage('Invalid Move!','Invalid Move',3000)
    }else if (y == 1 && x == 1){
      if (this.boardArray[x+1][y] == ' '  && this.boardArray[x][y+1] == ' '  && this.boardArray[x+1][y+1] == ' '){
        this.toastMessage('Invalid Move!','Invalid Move',3000)
      }
    }else if (y == 1 && (x != 1 && x != 8)){
      if (this.boardArray[x-1][y] == ' ' && this.boardArray[x-1][y+1] == ' ' && this.boardArray[x][y+1] == ' '  && this.boardArray[x+1][y+1] == ' '  && this.boardArray[x+1][y] == ' ' ){
            this.toastMessage('Invalid Move!','Invalid Move',3000)
          }
    }else if (x == 1 && (y != 1 && y != 8)) {
      if (this.boardArray[x][y-1] == ' ' && this.boardArray[x][y+1] == ' ' && this.boardArray[x+1][y-1] == ' ' && this.boardArray[x+1][y] == ' ' && this.boardArray[x+1][y+1] == ' '){
        this.toastMessage('Invalid Move!','Invalid Move',3000)
      }
    }else if (x==8 && y==1){
      if (this.boardArray[x-1][y] == ' ' && this.boardArray[x-1][y+1] == ' ' && this.boardArray[x][y+1] == ' '){
        this.toastMessage('Invalid Move!','Invalid Move',3000)
      }
    }else if (x == 8 && y == 8) {
      if (this.boardArray[x][y-1] == ' ' && this.boardArray[x-1][y-1] == ' ' && this.boardArray[x-1][y]){
        this.toastMessage('Invalid Move!','Invalid Move',3000)
      }
    }else if (y == 8 && x != 1) {
      if (this.boardArray[x-1][y] == ' ' && this.boardArray[x-1][y-1] == ' ' && this.boardArray[x][y-1] == ' ' && this.boardArray[x+1][y-1] == ' ' && this.boardArray[x+1][y] == ' '){
        this.toastMessage('Invalid Move!','Invalid Move',3000)
      }
    }else if (x == 8 && y != 1) {
      if (this.boardArray[x][y-1] == ' ' && this.boardArray[x-1][y-1] == ' ' && this.boardArray[x-1][y] == ' ' && this.boardArray[x-1][y+1] == ' ' && this.boardArray[x][y+1]){
        this.toastMessage('Invalid Move!','Invalid Move',3000)
      }
    }else if (x==1 && y == 8){
      if (this.boardArray[x][y-1] == ' ' && this.boardArray[x+1][y-1] == ' ' && this.boardArray[x+1][y] == ' '){
        this.toastMessage('Invalid Move!','Invalid Move',3000)
      }
    }else if (this.boardArray[x-1][y-1] == ' ' && this.boardArray[x][y-1] == ' '  && this.boardArray[x+1][y-1] == ' ' &&
              this.boardArray[x-1][y] == ' ' && this.boardArray[x][y] == ' '  && this.boardArray[x+1][y] == ' '  &&
              this.boardArray[x-1][y+1] == ' ' && this.boardArray[x][y+1] == ' '  && this.boardArray[x+1][y+1] == ' ' ){
              this.toastMessage('Invalid Move!','Invalid Move',3000)
    }else{
      this.checkIfValidMove(x,y)
    }
  }
  
  checkIfValidMove(x,y){
    for (let i=0; i < this.coordsArray.length;i++){
      for (let j=0; j < this.coordsArray.length;j++){
        if (this.boardArray[x+this.coordsArray[i]][y+this.coordsArray[j]] != ' ' && this.boardArray[x+this.coordsArray[i]][y+this.coordsArray[j]] != this.currPlayer){
          let dx = this.coordsArray[i]
          let dy = this.coordsArray[j]
          let boolValue = 0
          while (this.boardArray[x+dx][y+dy] != ' '){
            this.playerPiecesArray.push(this.boardArray[x+dx][y+dy])
            dx+=this.coordsArray[i]
            dy+=this.coordsArray[j]
          }
          // this.thing(dx,dy,i,j,x,y,boolValue)
          if (this.playerPiecesArray.includes(this.currPlayer)){
            this.addPlayerPiece(x,y)
            // this.turn++
            // this.currPlayer == 'O'
            // this.nextCurrPlayer(this.turn)
            
            let dx = this.coordsArray[i]
            let dy = this.coordsArray[j]
            while (this.boardArray[x+dx][y+dy] != ' ' && this.boardArray[x+dx][y+dy] != this.currPlayer){
              this.turn++
              this.boardArray[x+dx][y+dy] = this.currPlayer
              dx+=this.coordsArray[i]
              dy+=this.coordsArray[j]
            }
            this.playerPiecesArray = []
          }else{
            this.toastMessage('Invalid Move!','Invalid Move',3000)
            this.playerPiecesArray = []
          }
          // this.nextCurrPlayer(this.turn)
        }else{
          console.log('Not a valid option')
        }
      }
    }
    this.nextCurrPlayer(this.turn)
  }

  nextCurrPlayer(turn){
    if ((turn%2) == 1){
      this.currPlayer = 'O'
    }else{
      this.currPlayer = 'X'
    }
  }
}


