import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import { AiOutlineCloseCircle } from 'react-icons/ai';

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import NotificationMessage from './NotificationMesage';
import Modal from './Modal';

class App extends Component {
  state = {
    image: '',
    pictures: [],
    loading: false,
    error: null,
    status: 'idle',
    largeImageURL: '',
  };

  handleFormSubmit = image => {
    // console.log(image);
    this.setState({ image });
  };

  onImageClick = largeImageURL => {
    this.setState({
      largeImageURL,
    });
    console.log(largeImageURL);
  };

  modalClose = () => {
    this.setState({
      largeImageURL: '',
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevImage = prevState.image;
    const newImage = this.state.image;
    axios.defaults.baseURL = 'https://pixabay.com/api/';

    if (prevImage !== newImage) {
      this.setState({ status: 'pending' });
      await axios
        .get(
          `?q=${newImage}&page=1&key=24437827-e20f686b1c65a4a2859f17630&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response =>
          this.setState({ pictures: response.data.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const prevImage = prevState.image;
  //   const newImage = this.state.image;
  //   if (prevImage !== newImage) {
  //     console.log('new picture');
  //     // this.setState({ loading: true, pictures: [] });
  //     this.setState({ status: 'pending' });

  //     fetch(
  //       `https://pixabay.com/api/?q=${newImage}&page=1&key=24437827-e20f686b1c65a4a2859f17630&image_type=photo&orientation=horizontal&per_page=12`
  //     )
  //       .then(response => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         return Promise.reject(new Error('Картинки с таким названием нет'));
  //       })
  //       .then(data =>
  //         this.setState({ pictures: data.hits, status: 'resolved' })
  //       )
  //       .catch(error => this.setState({ error, status: 'rejected' }));
  //     // .finally(this.setState({ loading: false }));
  //   }
  // }

  render() {
    const { error, pictures, status, largeImageURL } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <NotificationMessage />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className={s.icon}>
          <Oval color="#00BFFF" height={80} width={80} />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <div className={s.app}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery pictures={pictures} onClick={this.onImageClick} />
          {pictures && <button className={s.button}>Load more</button>}
          {largeImageURL.length > 0 && (
            <Modal onClose={this.modalClose}>
              <button
                type="button"
                className={s.buttonModal}
                onClick={this.modalClose}
              >
                <AiOutlineCloseCircle />
              </button>
              <img
                src={this.state.largeImageURL}
                alt=""
                width="100%"
                height="100%"
              />
            </Modal>
          )}

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
