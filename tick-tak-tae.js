    const boardEl = document.getElementById('board');
    const statusEl = document.getElementById('status');
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameOver = false;

    function createBoard() {
      boardEl.innerHTML = '';
      board.forEach((cell, index) => {
        const cellBtn = document.createElement('button');
        cellBtn.className = 'cell';
        cellBtn.innerText = cell || '';
        cellBtn.onclick = () => handleClick(index);
        boardEl.appendChild(cellBtn);
      });
    }

    function handleClick(index) {
      if (board[index] || gameOver) return;
      board[index] = currentPlayer;
      createBoard();
      const winner = checkWinner();
      if (winner) {
        statusEl.innerText = `🎉 Winner: ${winner}`;
        gameOver = true;
      } else if (board.every(cell => cell)) {
        statusEl.innerText = "It's a Draw!";
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusEl.innerText = `Next Player: ${currentPlayer}`;
      }
    }

    function checkWinner() {
      const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      for (let [a,b,c] of wins) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    }

    function resetGame() {
      board = Array(9).fill(null);
      currentPlayer = 'X';
      gameOver = false;
      statusEl.innerText = 'Next Player: X';
      createBoard();
    }

    createBoard();