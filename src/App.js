import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';

function App() {

  
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path ="/">
            <Home />
            </Route>
            <Route path ="/login">
              <Login/>
            </Route>

            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
