
# Backend Server for Windows Desktop App

This backend server is designed to work with a Windows Desktop Application resembling that of a Google Form. It is built using TypeScript and Express, with JSON file storage for form submissions. 




## Features

- Endpoints 
`/ping`: GET request to check server status.

`/submit`: POST request to submit form data (parameters: name, email, phone, github_link, stopwatch_time).

`/read`: GET request with query parameter index (0-indexed) to retrieve form submissions.


## Start from here

First Clone the Repository

```bash
  git clone <repository_url>
  cd backend-server
```
Second Install the dependencies
``` bash
    npm Install
```
Third Run the server
```bash
    npm Start
```
The server will start running at   `http://localhost:3000`


Use these Endpoints:

* Ping Endpoint:

  `GET http://localhost:3000/ping`

* Submit Endpoint:

  `POST http://localhost:3000/submit`

* Body 

  `{
      "name": "Samarth T K",
      "email": "samarthtk2002@gmail.com,
      "phone": "9876543210",
      "github_link": "https://github.com/Samarth5TK",
      "stopwatch_time": "00:12:45"
  }`

* Read Endpoint:
  
  `GET http://localhost:3000/read?index=0`

  You can also replace `0` with the desired index 

Finally Shut Down the server: 

Press `Ctrl + C ` in the terminal to stop.


## Dependencies

* Express:  Fast, unopinionated, minimalist web framework for Node.js.

* Typescript: Typed superset of JavaScript that compiles to plain JavaScript.
