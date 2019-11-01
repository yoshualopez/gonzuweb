import React,{ Component } from 'react';
import PropTypes from 'prop-types';
class App extends Component{
  componentDidMount(){
    this.props.route('Home');
  }
  render(){
    return(
      <div className="container"></div>
    );
  }
}
App.prototypes = {
  route : PropTypes.func.isRequired
};

export default App;