import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './component/header/header.component';
import { auth, createUserProfileDocument  } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render(){
    return ( 
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;



/* <Route exact path='/topics' component={TopicsList} />
      <Route exact path='/topics/:topicId' component={TopicsDetail} /> */

// const HomePage2 = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <Link to='/topics'>topics list</Link>
//       <button onClick={() => props.history.push('./topics')}>
//         topics
//       </button>
//       <h1>HatsPage</h1>
//     </div>
//   );
// };

// const TopicsList = props => {
//   return (
//     <div>
//       <h1>Topics List Page</h1>
//       <Link to={`${props.match.url}/16`}>To Topic 16</Link>
//       <Link to={`${props.match.url}/15`}>To Topic 15</Link>
//       <Link to={`${props.match.url}/14`}>To Topic 14</Link>
//       <Link to={`${props.match.url}/12`}>To Topic 12</Link>
//     </div>
//   );
// };

// const TopicsDetail = (props) => {
//   return (
//     <div>
//       <h1>Topics Detail Page: { props.match.params.topicId }</h1>
//     </div>
//   );
// }