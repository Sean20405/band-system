import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails'
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
import Search from './Search';
import SearchResult from './SearchResult';
import { CookiesProvider, useCookies } from 'react-cookie';
import Test from './test';
<<<<<<< HEAD
import Profile from './Profile';
=======
import { CookiesProvider, useCookies } from "react-cookie";
import WelcomePage from './WelcomePage';
import Profile from './Profile';
import Logout from './Logout';
>>>>>>> b89703a5fd296d44d72e9b68e01c815c73044b4e
function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }
  return (
    <CookiesProvider>
      <Router>
        <div className="App">
          <Navbar  user={cookies.user}/>
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
<<<<<<< HEAD
                <Login />
=======
                  <Login onLogin={handleLogin}/>
              </Route>
              <Route path="/Profile">
                  <Profile  user={cookies.user}/>
              </Route>
              <Route path="/Logout">
                  <Logout onLogin={handleLogin}/>
>>>>>>> b89703a5fd296d44d72e9b68e01c815c73044b4e
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/searchresult">
                <SearchResult />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/blogs/:id">
                <BlogDetails />
              </Route>
              <Route path="/test">
                <Test />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </CookiesProvider>
  );
}

export default App;