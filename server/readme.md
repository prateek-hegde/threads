Installation Steps:
npm install
npm start

Test:
npm test

Routes: Local http://localhost:3000

    User:
        POST /api/register
        Parameters: username (String), password (String)

        POST /api/login
        Parameters: username (String), password (String)

    Threads: (authorization header required)
        GET /api/thread/all

        POST /api/thread/create
        Parameters: title (String), body (String)
        (All parameters are required)
