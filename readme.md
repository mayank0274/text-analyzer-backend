# Text analyzer

### Folder structure

```
1. server.js = main file for server configuration

2. db/ = folder containing file for mongodb connection

3. models/ = coontains schemas and models for user and history
        user.js => name , email , password , isVerified
        histroy.js => user , analysis_result , text

4. middlewres/ = have middleware for checking authectication and error handling

5. services/ = contains utility fn
        analyzeText.js => contains analyze text function which pass take text param and return analysis (GEMINI api is used for analyasis)
        customErrorHandler.js => class for handling errors
        jwtservice.js => sign and verify jwt tokens
        readFiles.js => function to read file to extract text content

6. config/ =
      systemPrompt.js => contain hardcoded prompt to tell ai how to analyze text
      envVariable.js => contains env variables

7. controllers/ =
        auth/ => have controllers related to login/signup
        text-analyze/ => have controllers related to text analysys and history

8. routes/ =
    contains routes for auth and analysis
```

### Running locally

1. Clone this repo or download zip

2. navigate to root folder of this project

3. setup env file similar to `./env.example` file

```
MONGO_CONN_URL =
JWT_SECRET =
GEMINI_API_KEY =
```

4. run this command to install dependencies

```
npm install
```

5. run this command to start server

```
nodemon server.js
```
