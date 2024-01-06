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
  const url="http://54.157.182.243:5000/"
  const [cookies, setCookie] = useCookies(["user"]);
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
                  <ResetPassword forget_user={cookies.forget_user} forget={Forget_func} url={url}/>
                )}
              </Route>
              <Route path="/login">
                  <Login onLogin={handleLogin} url={url}/>
              </Route>
              <Route path="/forget">
                  <Forget forget={Forget_func} url={url}/>
              </Route>
              <Route path="/Bandlogin">
                  <BandLogin onLogin={handleLogin} url={url}/>
              </Route>
              <Route path="/BandRegister">
                  <BandRegister url={url}/>
              </Route>
              <Route path="/Profile">
                  <Profile  user={cookies.user} url={url}/>
              </Route>
              <Route path="/Logout">
                  <Logout onLogin={handleLogin} />
              </Route>
              <Route path="/searchmusician">
                <SearchMusician url={url}/>
              </Route>
              <Route path="/searchband">
                <SearchBand url={url}/>
              </Route>

              <Route path="/register">
                <Register url={url}/>
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