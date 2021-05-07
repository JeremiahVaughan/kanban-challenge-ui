# KanbanChallenge

## Setup

Note: I used npm 6.14.7 and nodejs 14.8.0. If you should need to install the angular CLI then you can use 'npm install -g @angular/cli'

Run 'npm install' from the command line in the root of this project to ensure all external packages are installed.

Run 'npm run start' from the command line in the root of this project to get the server project running.

Make sure the server project is running: https://github.com/JeremiahVaughan/kanban-challenge-service.git

Go to http://localhost:4200 in your browser to start using the app.

## Styling Considerations

For the theme, I chose to go with a dark theme and heavily relied on flex box for a responsive design.

Using angular material as it does a ton of the work for me and is easily customizable.

Using scss instead of css.

Avoided using static units like px as much as possible, so the UI would be more responsive to different monitors.
