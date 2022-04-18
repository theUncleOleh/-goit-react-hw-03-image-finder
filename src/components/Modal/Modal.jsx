import React, { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillUnmount() {
    console.log('componentWillUnmout');
  }
  render() {
    return (
      <div className={s.overlay}>
        <div className={s.modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
  //
}

export default Modal;
