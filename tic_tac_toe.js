function TicTacToe() {

  this.active = false;
  this.winner = 0;
  
  this.grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  
  
  this.checkWin = function() {
    
    for(let i = 0; i < 3; i++){
      
        let rowSum = 0;
      
        for(let j = 0; j < 3; j++){
          
            rowSum += this.grid[i][j];
          
        }
      
        if(rowSum == 3)
            this.winner = 1;
      
        else if(rowSum == -3)
            this.winner = -1;
      
    }
    

    for(let i = 0; i < 3; i++){
      
        let colSum = 0;
      
        for(let j = 0; j < 3;j++){
          
            colSum += this.grid[j][i];
          
        }
      
        if(colSum === 3)
            this.winner = 1;
      
        else if(colSum === -3)
            this.winner = -1;
    }
    

    if(this.grid[0][0] + this.grid[1][1] + this.grid[2][2] === 3)
        this.winner = 1;
    
    else if(this.grid[0][0] + this.grid[1][1] + this.grid[2][2] === -3)
        this.winner = -1;

    if(this.grid[2][0] + this.grid[1][1] + this.grid[0][2] === 3)
        this.winner = 1;
    
    else if(this.grid[2][0] + this.grid[1][1] + this.grid[0][2] === -3)
        this.winner = -1;
    
    
    
    
    
    
    if (this.winner != 0) {
      
      this.active = false;
      checkGameEnd();
      
    }
    
  }

}