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
import { CookiesProvider, useCookies } from "react-cookie";
function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }
  return (
    
    <CookiesProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
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