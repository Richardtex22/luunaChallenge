import './App.css';
import Nav from './Nav';
import Home from './Home';
import Users from './Users';
import Repos from './Repos';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <Nav></Nav>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/Home" component={Home}></Route>
        <Route path="/Users" component={Users}></Route>
        <Route path="/Repos" component={Repos}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
