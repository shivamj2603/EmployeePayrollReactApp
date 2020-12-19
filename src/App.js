import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateEmployeeListComponent from './Components/CreateEmployeeListComponent';
import HeaderComponent from './Components/HeaderComponent';
import AddEmployeeComponent from './Components/AddEmployeeComponent';
import UpdateEmployeeComponent from './Components/UpdateEmployeeComponent';


function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
          <div>
            <Switch>
              <Route path = "/" exact component = {CreateEmployeeListComponent}></Route>
              <Route path = "/create" component = {AddEmployeeComponent}></Route>
              <Route path = "/update/:id" component = {UpdateEmployeeComponent}></Route>
            </Switch>
          </div>
      </Router>   
    </div>
  );
}

export default App;
