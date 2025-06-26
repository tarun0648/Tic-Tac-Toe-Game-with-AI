const gameBoard = (() => {
    const cells = document.querySelectorAll('[data-cell]');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    const gameModeSelect = document.getElementById('gameMode');
    const difficultySelect = document.getElementById('difficulty');
    const difficultyContainer = document.getElementById('difficultyContainer');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let isAIMode = true;
    let aiDifficulty = 'hard';

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (gameState[cellIndex] !== '' || !gameActive) return;

        makeMove(cellIndex);

        if (gameActive && isAIMode && currentPlayer === 'O') {
            setTimeout(makeAIMove, 500);
        }
    };

    const makeMove = (cellIndex) => {
        gameState[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].classList.add(currentPlayer.toLowerCase());

        if (checkWin()) {
            gameActive = false;
            status.textContent = `Player ${currentPlayer} wins!`;
            highlightWinningCells();
            return;
        }

        if (checkDraw()) {
            gameActive = false;
            status.textContent = "Game ended in a draw!";
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    };

    const makeAIMove = () => {
        if (!gameActive) return;

        let move;
        switch (aiDifficulty) {
            case 'easy':
                move = findRandomMove();
                break;
            case 'medium':
                move = Math.random() < 0.5 ? findBestMove() : findRandomMove();
                break;
            case 'hard':
                move = findBestMove();
                break;
        }

        if (move !== null) {
            makeMove(move);
        }
    };

    const findRandomMove = () => {
        const availableMoves = gameState
            .map((cell, index) => cell === '' ? index : null)
            .filter(cell => cell !== null);
        
        if (availableMoves.length === 0) return null;
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    };

    const findBestMove = () => {
        let bestScore = -Infinity;
        let bestMove = null;

        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                gameState[i] = 'O';
                let score = minimax(gameState, 0, false);
                gameState[i] = '';
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    };

    const minimax = (board, depth, isMaximizing) => {
        if (checkWinForMinimax('O')) return 10 - depth;
        if (checkWinForMinimax('X')) return depth - 10;
        if (checkDrawForMinimax()) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
                    board[i] = '';
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
                    board[i] = '';
                }
            }
            return bestScore;
        }
    };

    const checkWinForMinimax = (player) => {
        return winningCombinations.some(combination => {
            return combination.every(index => gameState[index] === player);
        });
    };

    const checkDrawForMinimax = () => {
        return gameState.every(cell => cell !== '');
    };

    const checkWin = () => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const highlightWinningCells = () => {
        winningCombinations.forEach(combination => {
            if (combination.every(index => gameState[index] === currentPlayer)) {
                combination.forEach(index => {
                    cells[index].classList.add('winning-cell');
                });
            }
        });
    };

    const checkDraw = () => {
        return gameState.every(cell => cell !== '');
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });

        if (isAIMode && currentPlayer === 'O') {
            setTimeout(makeAIMove, 500);
        }
    };

    const handleGameModeChange = (e) => {
        isAIMode = e.target.value === 'ai';
        difficultyContainer.style.display = isAIMode ? 'flex' : 'none';
        restartGame();
    };

    const handleDifficultyChange = (e) => {
        aiDifficulty = e.target.value;
        restartGame();
    };

    const init = () => {
        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        restartButton.addEventListener('click', restartGame);
        gameModeSelect.addEventListener('change', handleGameModeChange);
        difficultySelect.addEventListener('change', handleDifficultyChange);
        status.textContent = `Player ${currentPlayer}'s turn`;
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
    gameBoard.init();
});
