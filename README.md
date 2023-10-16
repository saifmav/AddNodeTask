
# Document Managment System








## Installation

Install AddNodeTask with npm

To run project for frontend repo

```bash
  npm i
  npm start
```
To run project for backend repo
```bash
  npm i
  npm run start
```







    
## Tech Stack

**Client:** React, Redux,  TailwindCSS , basic Typescript

**Server:** Node, Express


## API Reference

```http
 API_URL = 'http://localhost:3001'
```
#### Get all data
```http
  GET /documents
```
#### Upload Multiple Files or Single File
```http
  POST /upload
```
#### Delete Data From Table
```http
DELETE  /delete/:uuid
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | **Required**. uuid to particular item |

#### Download File From Table

```http
  GET /download/:uuid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | **Required**. uuid to download |


