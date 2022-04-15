import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    image: '',
    pictures: [],
    loading: false,
    error: null,
    status: 'idle',
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
      // this.setState({ loading: true, pictures: [] });
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${newImage}&page=1&key=24437827-e20f686b1c65a4a2859f17630&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Картинки с таким названием нет'));
        })
        .then(data =>
          this.setState({ pictures: data.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
      // .finally(this.setState({ loading: false }));
    }
  }

  render() {
    const { loading, error, pictures, status, image } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <p>tell me what you want</p>
          <SearchBar onSubmit={this.handleFormSubmit} />
        </div>
      );
    }

    if (status === 'pending') {
      return <div>Loading......</div>;
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <div className={s.app}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery pictures={pictures} />
          {pictures && <button className={s.button}>Load more</button>}

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
    // return (
    //   <div className={s.app}>
    //     {!image && <div>tell me what you want</div>}
    //     {error && <h2>{error.message}</h2>}
    //     {loading && <div>Loading......</div>}
    //     <SearchBar onSubmit={this.handleFormSubmit} />
    //     <ImageGallery pictures={pictures} />
    //     {pictures && <button className={s.button}>Load more</button>}

    //     <ToastContainer
    //       position="top-right"
    //       autoClose={5000}
    //       hideProgressBar={false}
    //       newestOnTop={false}
    //       closeOnClick
    //       rtl={false}
    //       pauseOnFocusLoss
    //       draggable
    //       pauseOnHover
    //     />
    //   </div>
    // );
  }
}

export default App;
