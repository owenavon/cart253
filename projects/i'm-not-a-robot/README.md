I'm not a robot
Owen Avon
December 2021

Purpose
The purpose of this program is to create a simulation in which the user must prove through various trivia and puzzles, that they are not a robot and are in fact a human behind the screen. The simulation with consist of varying puzzles that test multiple interactive components that only humans can perceive. Not to mention, the user must complete these puzzles within a certain amount of time and without error.

Artistic Vision
My artistic vision was to create a simulation that visualizes the fictious steps that a computer may process when a user clicks on the “I’m not a robot” button. I decided upon this subject as I wanted to explore the various interactive functions found in p5.js, while experiment with other interactive libraries such as ml5.js. The simulation’s overall design is coherent and neutral. The theme does not associate with any specific colour scheme, and thus I thought it would be best to stick to shapes and shades. I chose to use a heavy weighted sans-serif font, as I believe it helps tie the technological theme together.

User Experience
The intention of this project was to create an engaging user experience. Whether the user enjoys the simulation or not, they are forced to remain engaged. Most aspects of the simulation are timed, and thus If they look away, the simulation will likely change to the “loser” state, and they will be forced to restart. The simulation heavily focuses on interactivity such as keyboard input, mouse input, audio input, and video input.

Accomplishments
I believe I have accomplished both the aspects of technical functionality and artistic functionality, by combining the two elements together. An example of this can be found in the “cameraFlash” state. This state alone lasts only a few seconds but is artistically important. It adds dynamicity to the simulation by displaying animation and playing sound. The project would work without it but would become less engaging. Another instance of this can be found in the “ballPuzzle” state, where the timer is associated to the poly synth. The user must complete the simulation in roughly 20 seconds. The poly synth will become very high pitch and should help identify that the user is running out of time.
 
Important Notes:
The AudioIn function is not dependable. We had met about this and were not able to find a proper solution. Therefore, in case it does not function correctly, please use the up arrow to navigate the “audio ball”.
I was not able to get cocosd to turn off once the users face is detected. I tried various functions and setting the gotResults to false, however I was unsuccessful. This issue causes subsequent problems, as I believe by keeping it running in the background uses a lot of memory and thus makes the subsequent states to lag. I am not one to usually hand in something that is not functioning correctly, however I am all out of resources… I tried everything I could think of. When ml5.js starts, errors are found within tf-core.esm.js:17. Perhaps this is the root of the problem…


Credits
Sound Effects
Freesounds.com (https://freesound.org/)
"Puzzle (Loop).mp3" is attributed to "SuperGamerSVK". Link to webiste: https://freesound.org/people/SuperGamerSVK/sounds/509923/
"Camera shutter and flash combined.mp3" is attributed to "montclairguy". Link to website: https://freesound.org/people/montclairguy/sounds/353044/
"Tada Fanfare A.mp3" is attributed to "plasterbrain". Link to website: https://freesound.org/people/plasterbrain/sounds/397355/
"Success.mp3" is attributed to "fisch12345". Link to website: https://freesound.org/people/fisch12345/sounds/325112/
