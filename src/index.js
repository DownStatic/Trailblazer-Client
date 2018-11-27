import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './components/NavBar'
import Signup from './containers/Signup'
import TrailView from './containers/TrailView'
import UserView from './containers/UserView'
import SearchView from './containers/SearchView'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route path='/' component={NavBar} />
        <Route exact path='/App' component={App} />
        <Route exact path='/Signup' component={Signup} />
        <Route exact path='/Trail' component={TrailView} />
        <Route exact path='/Profile' component={UserView} />
        <Route exact path='/Search' component={SearchView} />
      </React.Fragment>
    </Router>
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
