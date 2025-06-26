# Tic Tac Toe with AI

A modern implementation of the classic Tic Tac Toe game with an AI opponent using the Minimax algorithm.

## Features

- Play against AI or another player
- Three AI difficulty levels:
  - Easy: Random moves
  - Medium: Mix of random and optimal moves
  - Hard: Optimal moves using Minimax algorithm
- Modern and responsive UI
- Smooth animations and transitions
- Real-time game status updates
- Winning combination highlighting

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Minimax Algorithm for AI

## How to Play

1. Choose your game mode:
   - Play vs AI: Challenge the computer
   - Play vs Player: Play against a friend
2. If playing against AI, select the difficulty level
3. Click on any empty cell to make your move
4. Try to get three in a row horizontally, vertically, or diagonally
5. Use the "Restart Game" button to start a new game

## AI Implementation

The AI opponent uses the Minimax algorithm in hard mode to make optimal decisions. The algorithm:
- Evaluates all possible moves
- Considers future game states
- Makes decisions to maximize winning chances
- Includes depth consideration to prefer winning in fewer moves

## How to Execute 

Using Python (if you have Python installed)

Open terminal/command prompt
Navigate to the project folder:
bashcd path/to/your/project/folder

Run a local server:
Python 3: python -m http.server 8000
Python 2: python -m SimpleHTTPServer 8000

Open your browser and go to: http://localhost:8000