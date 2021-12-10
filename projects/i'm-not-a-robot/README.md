I'm not a robot
Owen Avon
CART253
December 2021

Purpose
The purpose of this program is to create a simulation in which the user must prove through various trivia and puzzles, that they are not a robot and are in fact a human behind the screen. The simulation consists of varying puzzles that test multiple interactive components that only humans can perceive. Not to mention, the user must complete these puzzles within a certain amount of time and without error.

Artistic Vision
My artistic vision was to create a simulation that visualizes the fictious steps that a computer may process when a user clicks on the “I’m not a robot” button. I decided upon this subject as I wanted to explore the various interactive functions found in p5.js, while experiment with other interactive libraries such as ml5.js. The simulation’s overall design is coherent and neutral. The theme does not associate with any specific colour scheme, and thus I thought it would be best to stick to shapes and shades, given the context of the program. I chose to use a heavy weighted sans-serif font, as I believe it helps tie the technological theme together.

User Experience
The intention of this project was to create an engaging user experience. Whether the user enjoys the simulation or not, they are forced to remain engaged. Most aspects of the simulation are timed, and thus If they look away, the simulation will likely change to the “loser” state, and they will be forced to restart. The simulation heavily focuses on interactivity such as keyboard input, mouse input, audio input, and video input.

Accomplishments
I believe I have accomplished both the aspects of technical functionality and artistic functionality, by combining the two elements together. An example of this can be found in the “cameraFlash” state. This state alone lasts only a few seconds, but is artistically important. It adds dynamicity to the simulation by displaying animation and playing sound. The project would work without it, but would become less engaging. Another instance of this can be found in the “ballPuzzle” state, where the timer is associated to the poly synth. The user must complete the simulation in roughly 20 seconds. The poly synth will become very high pitch, and should help identify to the user that they are running out of time.
 
Important Notes:
The AudioIn function is not dependable. We had met about this and were not able to find a proper solution. Therefore, in case it does not function correctly, please use the up arrow to navigate the “audio ball”.
I was not able to get cocosd to turn off once the users face is detected. I tried various functions and setting the gotResults to false, however I was unsuccessful. This issue causes subsequent problems, as I believe by keeping it running in the background uses a lot of memory and thus makes the subsequent states lag. I am not one to usually hand in something that is not functioning correctly, however I am all out of resources… I tried everything I could think of. When ml5.js starts, the following error is found within the console: tf-core.esm.js:17. Perhaps this is the root of the problem…


Credits

Sound Effects
"Puzzle (Loop).mp3" is attributed to "SuperGamerSVK". CC0 1.0 Universal (CC0 1.0) Public Domain Dedication. Link to downloadable source from freesound.org: https://freesound.org/people/SuperGamerSVK/sounds/509923/
"Camera shutter and flash combined.mp3" is attributed to "montclairguy". CC0 1.0 Universal (CC0 1.0) Public Domain Dedication. Link to downloadable source from freesound.org: https://freesound.org/people/montclairguy/sounds/353044/
"Tada Fanfare A.mp3" is attributed to "plasterbrain". CC0 1.0 Universal (CC0 1.0) Public Domain Dedication. Link to downloadable source from freesound.org: https://freesound.org/people/plasterbrain/sounds/397355/
"Success.mp3" is attributed to "fisch12345". CC0 1.0 Universal (CC0 1.0) Public Domain Dedication. Link to downloadable source from freesound.org: https://freesound.org/people/fisch12345/sounds/325112/
All other sounds effects were recorded by me.

Font
"GE BODY" font is attributed to "ljdesignstudios.com". Message from author "This typeface has been designed under open source license, so it's totally free." Link to downloadable source from DaFont.com: "https://www.dafont.com/ge-body.font"

Code
The code for video detection and ml5.js comes from Pippin's notes on ml5.js: ObjectDetector. Link to view the notes / code: https://pippinbarr.github.io/cart263-2021/topics/ai/ml5js-object-detector.html

The initial code from cameraRiddle function comes from the website https://creative-coding.decontextualize.com/text-and-type/. More specifically the Text metrics sketch. I however heavily modified it. Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)
