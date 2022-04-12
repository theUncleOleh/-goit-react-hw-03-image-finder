import React, { Component } from 'react';
import s from './SearchBar.module.css';
import { toast } from 'react-toastify';

class SearchBar extends Component {
  state = {
    image: '',
  };
  handleInputChange = event => {
    this.setState({ image: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.image.trim() === '') {
      toast.warning('что вы ищите?');
      return;
    }
    this.props.onSubmit(this.state.image);
    this.setState({ image: '' });
  };
  render() {
    return (
      <header className={s.header}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.label}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
