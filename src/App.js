import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails'
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
import { SearchMusician, SearchBand } from './Search';
import { CookiesProvider, useCookies } from 'react-cookie';
import Test from './test';
import WelcomePage from './WelcomePage';
import Profile from './Profile';
import Logout from './Logout';
import BandLogin from './BandLogin'
import BandRegister from './BandRegister';
import Forget from './Forget';
import ResetPassword from './ResetPassword'
function App() {
  const url="http://54.160.85.246:5000/"
  const [cookies, setCookie] = useCookies(["user","forget_user"]);
  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }
  function Forget_func(id) {
    setCookie("forget_user", id, { path: "/" });
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
              <Route exact path="/ResetPassword">
                { !cookies.forget_user ||cookies.forget_user.user=="null" ? (
                  <NotFound />
                ):(
                  <ResetPassword forget_user={cookies.forget_user} forget={Forget_func}/>
                )}
              </Route>
              <Route path="/login">
                  <Login onLogin={handleLogin} />
              </Route>
              <Route path="/forget">
                  <Forget forget={Forget_func}/>
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
              <Route path="/searchmusician">
                <SearchMusician />
              </Route>
              <Route path="/searchband">
                <SearchBand />
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