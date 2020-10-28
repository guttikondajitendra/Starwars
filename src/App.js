import React from 'react';
import { simpleAction } from './Actions/Action';
import { connect  } from 'react-redux';
import CharacterComponent from "./CharactersComponent";
import ReactLoading from "react-loading";
import './App.css';


class App extends React.Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  }
  render () {
    const showLoading = this.props.showLoading;
  return (
    <div className="App">
      {
        showLoading &&
        <div className = "spinner">
          <ReactLoading type="spin" color="#000000" />
        </div>
      }
     <CharacterComponent />
  
    </div>
  );
}
}

const mapStateToProps = state => {
  const showLoading = state.app.showLoading;
  return {
    showLoading,
    ...state
  }
 }

 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

export default connect(mapStateToProps, mapDispatchToProps) (App);
