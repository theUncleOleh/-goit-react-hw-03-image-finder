import React, { Component } from 'react';
 import { ToastContainer } from 'react-toastify';
 import Loader from './Loader';
 import { AiOutlineCloseCircle } from 'react-icons/ai';
 // import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
 import 'react-toastify/dist/ReactToastify.css';
 import s from './App.module.css';
 import SearchBar from './SearchBar';
 import ImageGallery from './ImageGallery';
 import NotificationMessage from './NotificationMesage';
 import Modal from './Modal';
 import Button from './Button';
 import ErrorMessage from './ErrorMessage';
 import axiosApi from '../services/services-api';

class App extends Component {
  state = {
    searchQuery: null,
    pictures: [],
    loading: false,
    error: null,
    status: 'idle',
    largeImageURL: '',
    page: 1,
    totalPages: 0,
  };

  handleFormSubmit = query => {
    // console.log(image);
    this.setState({ searchQuery: query, page: 1 });
  };

  onImageClick = largeImageURL => {
    this.setState({
      largeImageURL,
    });
    // console.log(largeImageURL);
  };

  modalClose = () => {
    this.setState({
      largeImageURL: '',
    });
  };

  handleLoadButtonClick = () => {
    console.log('click the button', this.state.page);

    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log('before', prevState.searchQuery);
    console.log('after', this.state.searchQuery);
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ status: 'pending', pictures: [] });
      this.fetchImages();
    }

    if (prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }
  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    try {
      await axiosApi({ searchQuery, page }).then(data => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...data.hits],
          totalPages: data.totalHits,
          status: 'resolved',
        }));
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  render() {
    const { error, pictures, status, largeImageURL, totalPages } = this.state;
    const totalPictures = pictures.length;
    console.log(totalPictures);
    if (status === 'idle') {
      return (
        <div>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <NotificationMessage />
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ErrorMessage message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <div className={s.app}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery pictures={pictures} onClick={this.onImageClick} />
          {/* {pictures.length > 0 && (
             <Button onClick={this.handleLoadButtonClick} />
           )} */}
          {totalPictures > 0 && totalPictures < totalPages && (
            <Button onClick={this.handleLoadButtonClick} />
          )}

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
        </div>
      );
    }
  }
}

export default App;
