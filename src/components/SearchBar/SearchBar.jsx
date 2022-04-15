import React, { Component } from 'react';
import s from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
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
      return toast.warning('что вы ищите?');
    }
    console.log(this.state);
    this.props.onSubmit(this.state.image);
    this.setState({ image: '' });
  };

  render() {
    return (
      <header className={s.header}>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <span className={s.label}>
              <AiOutlineSearch className={s.icon} />
            </span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="image"
            value={this.state.image}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
