<h1>Project Battleship - TOP JS path @95%</h1>

This project focuses on recreating the Battleship game. There are a few variations of rules with this game:<br>
- [Wikipedia - Battleship](https://en.wikipedia.org/wiki/Battleship_(game))
- [Game On Family](https://gameonfamily.com/blogs/tutorials/battleship?srsltid=AfmBOooLd1ycFtvYy8zohyQSphNIdKXH-1e9dcH63YwkCWfsBiSpJGUq)
- [Pencil and Paper Games](http://www.papg.com/show?1TMC)
- [University of Oklahoma](https://www.ou.edu/content/dam/recservices/intramural%20documents/Battleship%20Rules.pdf)
- [Battleship game link on project page](http://en.battleship-game.org/)

<hr>

| Project Objectives                                                                                                            |          status           |
| ----------------------------------------------------------------------------------------------------------------------------- | :-----------------------: |
| 1. ship Class/factory function to represent each ship<br>                                                                    | [done] :white_check_mark: |
| &emsp;&emsp;- Create tests for ship class/factory, public interface only<br>                                                                    | [done] :white_check_mark: |
| &emsp;&emsp;- hit() function for ship class/factory<br>                                                                    | [done] :white_check_mark: |
| &emsp;&emsp;- isSunk() function to check if the ship is sunk, this is determined by<br>&emsp;&emsp;&ensp;&nbsp;the length and number of 'hits' the ship has taken<br>                                                                    | [done] :white_check_mark: |
| 2. Create a class/factory called Gameboard<br>                                                                                    | [done] :white_check_mark: |
| &emsp;&emsp;- Gameboards calls the Ship class/factory to place ships at specific<br>&emsp;&emsp;&ensp;&nbsp; coordinates<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- A receiveAttack() function for Gameboards to determine if the attack<br>&emsp;&emsp;&ensp;&nbsp;does score a hit or not. This will then sends a 'hit' function to the<br>&emsp;&emsp;&ensp;&nbsp;appropriate ship. If there's no hit then record it as a miss.<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- Keep track of missed attacks, for display/report.<br>&emsp;&emsp;&ensp;&nbsp;<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- Gameboards must be able to report if all ships were sunk.<br>&emsp;&emsp;&ensp;&nbsp;<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| 3. Create a class/factory called Player<br>                                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- 2 types of players, 'real' and 'computer'.<br>&emsp;&emsp;&ensp;&nbsp; <br>                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- Each player should contain its own gameboard.<br>&emsp;&emsp;&ensp;&nbsp; <br>                                                                    | [in progress] :hourglass_flowing_sand: |
| 4. Import all the class/factory functions mentioned above into a file.<br>&emsp; Use event liseners to interact with the objects.<br>                                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- The order is to create Player objects, then Gameboards for<br>&emsp;&emsp;&ensp;&nbsp;each players. For testing or initial implementation, fill the<br>&emsp;&emsp;&ensp;&nbsp;Gameboards with ships on predetermined coordinates.<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- Display both player's boards and render them using information from<br>&emsp;&emsp;&ensp;&nbsp;the Gameboard class/factory. Appropriate methods are needed to<br>&emsp;&emsp;&ensp;&nbsp;render the Gameboards.<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- User Event Listeners to step through the game. The Event Listeners<br>&emsp;&emsp;&ensp;&nbsp;should use methods from other objects. If there is a need for a new<br>&emsp;&emsp;&ensp;&nbsp;function then a decision needs to be made about where this new<br>&emsp;&emsp;&ensp;&nbsp;function should be placed, which class/factory.<br>&emsp;&emsp;&ensp;&nbsp;<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- Each player is allowed to click on the their opponent's Gameboard.<br>&emsp;&emsp;&ensp;&nbsp;Each user inputs should be sent to the appropriate objects, which<br>&emsp;&emsp;&ensp;&nbsp;would re-render the boards to display the new information.<br>&emsp;&emsp;&ensp;&nbsp;<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- Computer should be able to determine if a play is legal or not.<br>&emsp;&emsp;&ensp;&nbsp;<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| &emsp;&emsp;- There must be a condition check to see if any sides have<br>&emsp;&emsp;&ensp;&nbsp;lost all their ships, and end the game by declaring the winner.<br>                                                                    | [in progress] :hourglass_flowing_sand: |
| 5. Finish the project by implementing a system that allows the players<br>&emsp;to place their ships. <br>                                                                                    | [in progress] :hourglass_flowing_sand: |

- [The Odin Project: Project Battleship Objectives page](https://www.theodinproject.com/lessons/node-path-javascript-battleship)
