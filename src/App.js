import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { inspect } from 'util';

const History = createHistory();

const Topics = ({ match }) => {
  console.log(`\n\n This is match in Topic(s) ${ JSON.stringify(match) }`)
  var dynamicSlugs = [1, 12, 123, 1234];
  console.log(`======= \n HISTORY \n ${ inspect(History) } \n ========`);

  return(
    <div>
      <h2>Topics</h2>
      <ul>
      {
        dynamicSlugs.map((el, index) => {
          return(
            <li key={index}>
              <Link to={`${match.url}/${el}`}>
                { el }
              </Link>
            </li>
          )
        })
      }
      </ul>
      <Route path={`${match.url}/:topicId`} component={Topic}/>
      <Route exact path={match.url} render={() => (
        <h3>Please select a topic.</h3>
      )}/>
    </div>
  )
};

const Topic = ({ match }) => {
  console.log(`\n\n This is match in Topic ${ JSON.stringify(match) }`)
  var dynamicNestedSlugs = [2, 23, 234, 2345];
  console.log(`======= \n HISTORY \n ${ inspect(History) } \n ========`);

  return(
    <div>
      <h2>{ match.params.topicId }</h2>
      <ul>
        {
          dynamicNestedSlugs.map((el, index) => {
            return(
              <li key={index}>
                <Link to={`${match.url}/${index}`}>
                  { el }
                </Link>
              </li>
            )
          })
        }
      </ul>
      <Route path={`${match.url}/:doubleNestedId`} component={doubleNested} />
      <Route exact path={match.url} render={ () => (
        <h3>Yo dawg choose a double nester for this { match.params.topicId }</h3>
      )}/>
    </div>
  )
};

const doubleNested = (props) => {

  function handleClick(e) {
    console.log(`hit handle click`);
    e.preventDefault();
    console.log(`\n\n\n ******* \n PROPS ${ inspect(props) }`);
    props.history.push('/');
  }

  console.log(`this is match in double nested topic ${ JSON.stringify(props) }`);
  console.log(`======= \n HISTORY \n ${ inspect(History) } \n ========`);

  return(
    <div>
      <h3>Double nested { props.match.params.doubleNestedId }</h3>
      <button onClick={ handleClick }>Go home</button>
    </div>
  )
}

const App = (props) => {

  const goForward = e => {
    e.preventDefault();
    History.goForward();
  }

  const goBackward = e => {
    e.preventDefault();
    History.goBack();
  }

  return(
    <Router>
      <div>
        <ul>
          <li><Link to="/topics">Topics</Link></li>
          <li><button onClick={goForward}>forward</button></li>
          <li><button onClick={goBackward}>backward</button></li>
        </ul>
        <hr/>
        <Route exact path="/" component={Home}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </Router>
  )
};

// this function arg syntax is object desctructing which is
// pulling the history object off of the props object
const Home = ({ match }) => {
  console.log(`\n\n This is match in Home ${ JSON.stringify(match) }`)
  return(
    <div>
      <h2>Home</h2>
    </div>
  )
};

export default App;
