const boardElement = document.getElementById('board');
    const messageElement = document.getElementById('message');
    const winSound = document.getElementById('win-sound');
    const playerXInput = document.getElementById('playerX');
    const playerOInput = document.getElementById('playerO');

    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = false;
    let players = { X: 'Player X', O: 'Player O' };

    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    function renderBoard() {
      boardElement.innerHTML = '';
      board.forEach((cell, i) => {
        const cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        cellEl.textContent = cell || '';
        cellEl.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cellEl);
      });
    }

    function handleCellClick(index) {
      if (!gameActive || board[index]) return;

      board[index] = currentPlayer;
      renderBoard();

      if (checkWinner()) {
        showCelebration();
        winSound.play();
        alert(`🎉 ${players[currentPlayer]} wins!`);
        messageElement.textContent = `🎉 ${players[currentPlayer]} wins!`;
        gameActive = false;
      } else if (board.every(cell => cell)) {
        messageElement.textContent = "🤝 It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `${players[currentPlayer]}'s turn`;
      }
    }

    function showCelebration() {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }

    function checkWinner() {
      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[b] === board[c];
      });
    }

    function resetGame() {
      board = Array(9).fill(null);
      currentPlayer = 'X';
      gameActive = true;
      messageElement.textContent = `${players[currentPlayer]}'s turn`;
      renderBoard();
    }

    function startGame() {
      players.X = playerXInput.value || 'Player X';
      players.O = playerOInput.value || 'Player O';
      board = Array(9).fill(null);
      currentPlayer = 'X';
      gameActive = true;
      messageElement.textContent = `${players[currentPlayer]}'s turn`;
      renderBoard();
    }

    renderBoard();