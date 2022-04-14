import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './SearchBar';


class App extends Component {
  state = {
    imagis: '',
  };

  handleFormSubmit = imagen => {
    console.log(imagen);
    this.setState({ imagen });
  };

  // componetDidUpdate(prevProps, prevState) {
  //   if (prevState.image !== this.state.image) {
  //     console.log(this.state.image);
  //     console.log(prevState.image);
  //     console.log('imageeee');
  //   }
  // }

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
