# ToDoList

This is a small application where a user will be able to create a to-do list and perform all CRUD operations on that list. It uses Angular material as its framework.
### Please follow the instructions below carefully to run the app properly.

## Development server
* First clone the repository to to your local machine.
* Run `npm install` to download all the relevant dependancies.
You will need to run TWO terminals in order to access both the db.json database and the localhost co-currently.
* On your first terminal Run `json-server --watch db.json` to start a JSON  database to enable the sending of `HTTP requests`.
* On a SECONDARY terminal Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` on your local browser. The application will automatically reload if you change any of the source files.
* Now start interacting with the app.

## Functionalities

Here is what you will be able to do with the app:
* Create a new task, that will have four properties `(name, category, urgent/importance, done)`, NB: The submit button will be `enabled` only when the `Enter Task` field has been filled.
* Once a task is created it will appear on top of the list of tasks, and the user will have the possibility to manipulate its properties such as `importance` and  `done`.
* A sliding bar controls the `importance` and once it is swapped the task's card `color` will change to a bright `yellow`.
* The card has a `check box` on the left of the task that the user can use to mark the task as `completed`, when pressed the task will have ` a line run through` it to mark it visually.
* The user will be able to `update` both the category and name of a task
* The user will be able to `delete` a task.
* There are two form fields at the top of all the tasks, a `search` and `filter by` fields, with the `filter by` the user will be able to access all `important or non-important` tasks collectively, and with the `search` field they will be able to find a specific task by `name` or `category`.
* NB: All the changes made to a task will persist after refreshing or even re-running of the app, all the information will be saved in the `db.json` database via `HTTP requests`
* The app is responsive on both desktops and mobile devices.

## Screenshots

Desktop Display

![Desktop display screenshot](./src/assets/Images/Desktop%20display%20Screenshot%202023-12-08%20at%2000.05.22.png)

Filtering by importance

![Filtering by importance](./src/assets/Images/Filter%20by%20Importance%20Screenshot%202023-12-08%20at%2000.07.50.png)

Mobile Display
![Mobile display screenshot](./src/assets/Images/Mobile%20display%202023-12-08%20at%2000.10.55.png)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.
