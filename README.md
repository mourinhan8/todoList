# NodeJS-TodoList-API

# Installation
Run the following command to clone the repository
```
git clone https://github.com/mourinhan8/todoList.git
```
install
```
yarn
```
# Run the App

## For dev environment
Create ```.env.dev``` file and copy the following code
```
APP_PORT=Your port to run api
DATABASE_NAME=Your sqlite filename
```
Running command
```
yarn dev_server
```

## For product environment
Create ```.env``` file and copy the following code
```
APP_PORT=Your port to run api
DATABASE_NAME=Your sqlite filename
```
Running command
```
yarn build
yarn prod_server
```

# Run the test
All the test in directory ```__test__```

Running all test case by command
```
yarn test
```