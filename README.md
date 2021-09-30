# myFlix

<p>React frontend application for <a href="https://github.com/JBorchers/movie_api">myFlix API</a></p>
<p>Client side single page application</p>

### Description

Internet movie database that allows registered users to browse movies by Title, Genre, Director.
Users can change their username, email adress and birthday. While browsing the movies collection, users can add movies to their list of favorites.

### Tools used

| Property          | Tool       |
| ----------------- | ---------- |
| Language          | JavaScript |
| Library           | React      |
| Route handling    | Axios      |
| Styling Framework | Bootstrap  |
| State management  | Redux      |
| API               | REST       |
| Bundler           | Parcel     |

### Dependencies

<ul>
<li>axios</li>
<li>parcel</li>
<li>parcel-bundler</li>
<li>prop-types</li>
<li>react<li>
<li>react-dom</li>
<li>react-redux</li>
<li>redux<li>
<li>react-router-dom</li>
<li>babel</li>
</ul>


### User Stories

<ul>
<li>As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.</li>
<li>As a user, I want to be able to create a profile so I can save data about my favorite movies</li>
</ul>

### Application functions

The myFlix app provides a collection of movies that can be viewed by registered users. User data is also stored in a collection and API calls are made

### Setting up the tools:

First, install Parcel globally. This is the bundler that is used to bundle the application and make it accessible in your browser.

In your terminal, type:

```
$ npm install --global parcel@next
```


You can now download the repository to your computer and install the necessary modules by running:

```
$ npm install
```

### Start the application

To start the development server, type the following in your terminal:

```
$ parcel src/index.html
```

the path to index.html is supposed to be put behind the parcel command, in this case _parcel src/index.html_

or

```
$ npm run dev
```

The console shows you the port on which the application is rendered. If your browser doesn't open automatically, open it manually and navigate to the URL given in the terminal, in most cases: http://localhost:3000

### App structure

```
    myFlix_Client
    App
    |_  main-view
        |_  navbar
        |   |_  profile-view
        |
        |_  movie-view
        |   |_  movie-card
        |
        |_  login-view
        |   |_  registration-view
        |
        |_  genre-view
        |_  director-view
```

#### Essential features of the Components

main-view

<ul>
<li>Returns a list of ALL movies to the user (each listed item with an image, title, and description)</li>
<li>Sorting and filtering</li>
<li>Option to expand details</li>
</ul>
navbar
<ul>
<li>Option to logout</li>
<li>Return to home screen</li>
</ul>
profile-view
<ul>
<li>Allows users to update their user information (username, password, email, date of birth)</li>
<li>Allows existing users to deregister</li>
<li>Displays favorite movies</li>
<li>Option to remove a movie from their list of favorites</li>
</ul>
login-view
<ul>
<li>Allows users to log in with a username and password</li>
</ul>
registration-view
<ul>
<li>Allows new users to register (username, password, email, birthday)</li>
</ul>
genre-view
<ul>
<li>Returns data about a genre, with a name and description</li>
<li>Returns movies within the selected genre</li>
</ul>
director-view
<ul>
<li>Returns data about a director (name, bio, birth year, death year)</li>
<li>Returns movies with the selected director</li>
</ul>