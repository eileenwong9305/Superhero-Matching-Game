# Superhero-Matching-Game
Card matching game written for Udacity IPND Front-End Memory Game Project.

## Project background
This game is built as the project for Udacity Intro to Programming Nanodegree Program - Front-End Development. This project demonstrate mastery of HTML, CSS and Javascript. It is a complete browser-based card matching game.

## Instruction to Load the Game
Clone the repo and open game.html

### How to Play
After loading the game, click on "Start" button when prompted. Timer will start running.
![Start screen](screenshot/startScreen.PNG "Start screen")

The screen will show a game board consists of sixteen cards arranged in a grid. The deck is made up of eight different pairs of cards, each with different superhero image on one side. The cards are arranged randomly on the grid with the image face down. The star rating on top left reflects the player performance. The more number of moves made by player, the less the stars. The move counter displays the current number of moves made by player. Timer on the top right of the game board display time taken by player while playing. The pause button allows the player to pause the game. The restart button allows player to reset the game board, the timer, and the star rating.
![Game board](screenshot/gameBoard.PNG "Game board")

The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match. When card is clicked, it will be flipped open. If two opened cards match, the cards will stay flipped over with backgrounds turn to yellow.
![Cards match](screenshot/gamePlay.PNG "Matched cards")

If the cards do not match, the background of cards appear red and cards will be flipped face down and remain hidden state.
![Cards do not match](screenshot/wrongMatch.PNG "Wrong match card")

Once player complete the game, a modal appears to congratulate the player and ask if they want to play again. It also displays the star rating, number of moves and time taken by player to win the game. It also displays the best score made by player in his/her play history.
![Winning modal](screenshot/gameComplete.PNG "Winning modal")

During the period of playing, player can pause the game. The timer is paused and a modal appears asking if player wants to continue the game or start a new game.
![Pause modal](screenshot/pauseScreen.PNG "Pause modal")
