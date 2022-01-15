# Devloper_connector
A small social network app that includes authentication, profiles and forum posts.


## Steps to run the project:

1. Add a default.json file in config folder with the following
```json
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

2. Install server dependencies

```bash
npm install
```

3. Install client dependencies

```bash
cd client
npm install
```
4. Run both Express & React from root

```bash
npm run dev
```
