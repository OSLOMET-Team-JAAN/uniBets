# GAME-FIXING
<picture>
  <img alt="logo" width=120 src="/react_app/src/styles/images/logo.png">
</picture>

### Table of Content
* [Introduction](#Introduction)
* [Description](#Description)
* [System Architecture](#System-Architecture)
* [Technologies used](#Technologies-used)
* [Setup and run](#Setup-and-run)
* [Dependencies](#Dependencies)
* [Authors](#Authors)
* [Version History](#Version-History)
* [Acknowledgments](#Acknowledgments)
* [Conclusion](#Conclusion)
* [References](#References)

## Introduction
This is a bachelor’s thesis in the Departments of Computer Science and Information Technology at Oslo Metropolitan University as part of the degree program during the Spring 2023 semester.


## Description
The final project of this thesis is a React web-based application that helps "**Forzasys**" AS to analyse data collected from daily placed bets in tables and charts and to determine if any act of intentionally manipulating the outcome or in other word (fraud) has occurred. To put it simply, this application permits the system administrator to input the data via a CSV file. Then, the application will analyse the file, and the result will be presented on the Dashboard page, where the admin can catch any suspicious actions from the players.

An example CSV files can be found inside the project.

## System Architecture

The application has a **Domain** class, an API project, and a React project. The Domain class serves as the hub of everything and is independent of other components. Bets entities are contained in the Domain class.

The API project, a layer above the Domain class, handles HTTP requests from the React project, bet logic, and responses, alongside authentication and authorization. It makes bets entities available via the Domain class. It operates separately from the user interface, the React project, which manages API calls and JSON data rendering.

The system requires login to grants full access to an ADMIN and limited access to a User. A user registering is automatically given the User Role. The system has pre-established ADMIN and USER accounts for testing as mentioned in the following table.

<details>
<summary>Predefined Usernames & Passwords</summary>

| **Username** | **Password** |
|:------------:|:------------:|
|    ADMIN     |    ADMIN     |
|     USER     |     USER     | 

</details>

## Technologies used

* [React](https://react.dev/) single page application
* Frontend programming language is [TypeScript](https://www.typescriptlang.org/)
* Routing done using [React Router](https://reactrouter.com/en/main)
* State management via [createContext](https://react.dev/reference/react/createContext)
* Http requests via [Axios](https://www.npmjs.com/package/axios)
* Backend development via [ASP.NET Core](https://dotnet.microsoft.com/en-us/learn/aspnet/what-is-aspnet-core)
* Backend programming language is [C#](https://learn.microsoft.com/en-us/dotnet/csharp/)
* Database used [SQL Server 2022 Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

## Setup and run
1. Clone the repository and install the dependencies. 
```
   npm install
```
2. Before start Backend (**BetApi**) it is required to connect to database, we have used Microsoft SQL Server Management Studio (SSMS) you can install t by following this Link:
[sqlexpress](https://aka.ms/ssmsfullsetup ) 
3. Connect to database:
```
Open SSMS and then a window will pop up with the server name to your computer you need to copy the server name. 
Then you will pate it into `Visual studio` à BetAPi à appseting.json and need to insert your server's name into 
"ConnectionAPIConncetionString"
```
4. Start backend `BetApi`:
```
run the project without debugging by clicking on the empty play green icon in the ribbon.   
```
5. Start the frontend application locally, but be sure that starting from react_app folder:
```
npm start
```
6. In the browser will be opened swagger tab with BetApi functionality and react application tab where user can commence application exploring. Use predefined credentials to access desired functionality defined by roles (USER, ADMIN). Enjoy!


7. Upload CSV files via `Admin page`:
```
Inside Admin page click on Choose file then choose the file you want to analyze from your computer. 
We will provide you with an example file in case you don’t have any. 
Then click on Explore to see the content of the file Figure 6.1, otherwise only football loader will appear.
```
8. To run frontend tests:
```
npm test
```

9. To run backend tests (via Rider of JetBrains):
```
Tests -> Cover All tests from Solution (CTRL+U,K)
Tests -> Run All tests from Solution (CTRL+U,L)
```


## Dependencies
### List of Frontend dependencies (package.json):
* [react](https://react.dev/)
* [react-dom](https://www.npmjs.com/package/react-dom)
* [react-icons](https://www.npmjs.com/package/react-icons)
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)
* [recharts](https://www.npmjs.com/package/recharts)
* [typescript](https://www.npmjs.com/package/typescript)
* [papaparse](https://www.npmjs.com/package/papaparse)
* [axios](https://www.npmjs.com/package/axios)
* [@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome)
* [@fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons)
* [@material-tailwind/react](https://www.npmjs.com/package/@material-tailwind/react)
* [file-saver](https://www.npmjs.com/package/file-saver)
* [web-vitals](https://www.npmjs.com/package/web-vitals)
* [popper](https://www.npmjs.com/package/popper)
* [@heroicons/react](https://www.npmjs.com/package/@heroicons/react)
* [tailwind](https://tailwindcss.com/docs/guides/create-react-app)

## Authors

* [Aleksander Korkh](https://github.com/korkh)

* [Jessica Chackyan](https://github.com/scouca)

* [Aya Abdelhady](https://github.com/aya96m)

* [NourhatHasan](https://github.com/NourhatHasan)


## Version History

* 0.1
    * Initial Release

## Acknowledgments

We would like to thank **Steven Hicks** and **Pål Halvorsen**, who have given us the opportunity to be part of a Team that has been working on such an advantageous and challenging project, which adds a lot to our knowledge and has given us a new experience and wide understanding for the updated technology.

## Conclusion
The project undertaken achieved its objectives by successfully developing a distinctive Dashboard system comprising various widgets designed specifically for the purpose of fraud detection. 

## References
> * [Basic writing and formatting syntax for README.md](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
> * [README content example](https://github.com/lucas-mancini/react-app-readme-example#readme)
