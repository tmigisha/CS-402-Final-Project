## Introduction
 A simple color pattern guessing game app, where you guess a pattern of colors and given clues to help figure out the right order. 

## Overview
This app is the classic board game, mastermind digitalized. Where the computer is the mastermind who creates a secret set of patterns made up of colors. Its up to the user to guess the correct order of the pattern.  The user are given hints via + and - , that tells if its in the correct or wrong color/position.  The functionality of the app are as follows:
* Homepage - The homepage with various options for gameplay
    - Number of symbols - option of number of symbols generated 
    - Number of tries - amount of guesses in one game
    - show correct position-  option that give you hint on correct postion
    - No duplicates - option with no duplicate color/symbol in the secret pattern
    - Start -start button to start the game
* Gameboard- the gameplay
    - home - go back to home
    - new - start new game
    - undo - undo last move

  
## Compiling and use 

To compile this project, open it up in the expo app via url, which can be found here 

The app should open up to a home page with various options for gameplay. For default settings, simply press start. The default settings are 8 guesses, duplicate color/patterns allowed and no correct position hints. See overview for the list of options.

There is a set of 6 colors to choose from: red, blue, green, yellow, orange, purple. Each game has a randomly generated pattern of 4 colors. The goal of the game is to guess the pattern.  The "+" means that one of the colors is in the pattern and is in the right place. A  "-" means it is the right color in the pattern but in the wrong place. No symbol means a color is wrong and not in the right place. The order of the hints does not tell you what order each color is in, just that there is a correct color in the right place or there is a correct color but in the wrong place. 

Click on any of the associated color buttons to guess. After 4 guesses, the hint will show how close you are to the correct guess. To win, the user must guess all 4 "+". To undo your move, press undo. To play a new game, presss new. To go back to homepage, press home. 

## Development

The development process started with creating the different components that make up the user interface including the home page, game screen (board and input box), as well as the board row that makes up the game board. This involved learning new features such as the dropdown menu to use in our home page as well as figuring out how we would keep track of each submitted pattern guess and board row slot to which we found a 2-dimensional array to work best. After working through all the logistics of setting up the board based on the settings from the home page as well as rendering icons, the actual logic for generating a secret pattern and checking the submitted guesses was implemented. 

The game logic behind the scenes involved using several arrays to keep track of already "checked" icons so they aren't rechecked, returning a final array ranging from 0-2; 0 representing no match, 1 representing a partial match but not in the correct position, and 2 representing a complete match of the icon in the right position. This is what helped us implement the clue box to the left of each board row to show the number of icons in the right positon and the number of those that aren't. From this, we were also able to implement the correct position setting on the home page so that if it is selected, the "+" in the clue box will be the color of the associated icon in the right position to make it easier for the player to guess the correct position. In the end, if the result array was all 2's, meaning the player guessed the correct pattern, they would get a "win" alert telling them they have won the game and giving them option to go back to the home page or start a new game with the same settings. On the other hand, if the player goes through all the rows without getting the right pattern, they get a "game over" alert with the correct pattern, also giving them an option back to the home page or start a new game. 

## Resources used

* Online mastermind game: https://www.mahjongfun.com/mastermind/
* React native dropdown menu: https://www.npmjs.com/package/react-native-element-dropdown










