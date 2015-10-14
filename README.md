# pgreact-simple

A simple **React.js**-**Node.js**-**PostgreSQL** web application implementing basic CRUD operations through RESTful APIs.

As always, clean and good-looking code following RESTful best practices. These are the rules. 


## Install and Run

    $ npm install -g grunt
    $ npm install
    $ grunt default
    
Then, in another tab:

    $ npm start
    
You can now point your browser to `http://localhost:3000/`. Assure PostgreSQL is up and running.


## Tests

Start the backend in another console, then run:

    $ npm test
    
Assure PostgreSQL is up and running.


## Implemented APIs

- `GET /api/users`: 

  Returns an array of users:
    
        @param:    void
        @return:   { 
                       error: boolean,
                       results: [
                           user: { 
                               id: int,
                               name: string, 
                               age: int, 
                               email: string 
                           }
                        ]
                    }


  If an id is provided as query parameter, eg. `http://<hostname>:<port>/users?id=12345`, then the result is the following:

        @param:    id: int
        @return:   { 
                       error: boolean,
                       user: { 
                           id: int,
                           name: string, 
                           age: int, 
                           email: string 
                       }
                   }
     
- `POST /api/users`: 

  Insert a new user entry into the database:
    
        @param:    user: { 
                       [id: int,]
                       name: string, 
                       age: int, 
                       email: string 
                   }
        @return:   { error: boolean }

- `PUT /api/users`: 

  Update an user entry:
    
        @param:    { id: int }
        @return:   { error: boolean }


- `DELETE /api/users`: 

  Delete an user entry from the database:
    
        @param:    user: { 
                       id: int,
                       name: string, 
                       age: int, 
                       [email: string]
                   }
        @return:   { error: boolean }

