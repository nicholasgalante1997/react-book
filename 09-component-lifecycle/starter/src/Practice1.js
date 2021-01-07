import React from "react";

const Practice1 = () => <Header sitename="React Explained" />;

class Header extends React.Component {
  state = {
    username: "defaultusername"
  };
  /* 
    1. Call static getDerivedStateFromProps(props, state) {}
    2. Inside of that log out the props and state
    3. Then create a newState object where you override the current username
    4. Return the newState
  */

  static getDerivedStateFromProps(props, state){
    console.log(props)
    console.log(state)

    const newState = {
      username: "new_kids_on_the_react_bloq"
    }
  }
  render() {
    return (
      <header>
        <h1>{this.props.sitename}</h1>
        <p>Hi {this.state.username}!</p>
      </header>
    );
  }
}

export default Practice1;
