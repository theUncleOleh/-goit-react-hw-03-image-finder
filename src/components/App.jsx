import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './SearchBar';


class App extends Component {
  state = {
    image: '',
    pictures: [],
    loading: false,
  };

  handleFormSubmit = image => {
    console.log(image);
    this.setState({ image });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevState.image;
    const newImage = this.state.image;
    if (prevImage !== newImage) {
      console.log('new picture');
      this.setState({ loading: true });

      fetch(
        `https://pixabay.com/api/?q=${newImage}&page=1&key=24437827-e20f686b1c65a4a2859f17630&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => this.setState({ pictures: data.hits }))
        .finally(this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <div>
        {this.state.loading && <div>Loading......</div>}
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
