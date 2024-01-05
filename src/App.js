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
import Test from './test';
import { CookiesProvider, useCookies } from "react-cookie";
import WelcomePage from './WelcomePage';
import Profile from './Profile';
import Logout from './Logout';
import BandLogin from './BandLogin'
import BandRegister from './BandRegister';
function App() {
  const url="https://9837-3-112-171-158.ngrok-free.app/"
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
                  <Login onLogin={handleLogin} />
              </Route>
              <Route path="/Bandlogin">
                  <BandLogin onLogin={handleLogin} />
              </Route>
              <Route path="/BandRegister">
                  <BandRegister />
              </Route>
              <Route path="/Profile">
                  <Profile  user={cookies.user}/>
              </Route>
              <Route path="/Logout">
                  <Logout onLogin={handleLogin}/>
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