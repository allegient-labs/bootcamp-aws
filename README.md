# DMI AWS Bootcamp

2019 DMI AWS Bootcamp sample project

## Requirements

- Node v8+
- AWS CLI
- SAM CLI
- Servless Framework CLI

## Deploying

You must have your terminal set up for access to AWS over the CLI, either by configuring the CLI or by setting the appropriate environment variables. Run the following commands to deploy the application to AWS with each different method.

### AWS SAM

Replace `UNIQUE-BUCKET-NAME` with a unique string

```bash
sam package --template-file sam.yml --s3-bucket UNIQUE-BUCKET-NAME --output-template-file template-output.yml
sam deploy --template-file template-output.yml --stack-name dmi-bootcamp-sam --capabilities CAPABILITY_IAM
```

### Serverless Framework CLI

```bash
serverless deploy
```

## Calling the API

All of these examples use the cURL CLI tool, but tools such as Postman can also be used.

### Endpoints

| Operation | HTTP Method | Path          |
|-----------|-------------|---------------|
| Create    | `POST`      | `/pet`        |
| Read      | `GET`       | `/pet/PET_ID` |
| Update    | `PUT`       | `/pet/PET_ID` |
| Delete    | `DELETE`    | `/pet/PET_ID` |
| List      | `GET`       | `/pet`        |

### HTTP Calls

#### HTTP Get

```
curl -v ENTER_URL_HERE
```

#### HTTP Post

```
curl -v -X POST \
  ENTER_URL_HERE \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{"name": "Spot", "species": "Dog", "description": "Black and white with spots" }'
```

#### HTTP PUT

```
curl -v -X PUT \
  ENTER_URL_HERE \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{"description":"red","name":"Rover"}'
```

#### HTTP Delete

```
curl -v -X DELETE ENTER_URL_HERE
```

## Data Model

There is only one data model in this example, called `Pet`.

| Property    | Type        | Notes                  |
|-------------|-------------|------------------------|
| id          | GUID String | Automatically assigned |
| name        | String      | Required               |
| species     | String      | Required               |
| description | String      | Required               |
