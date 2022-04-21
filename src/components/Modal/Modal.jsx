import React, { Component } from 'react';
import {createPortal} from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root')
class Modal extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown)
  }
  componentWillUnmount() {
    console.log('componentWillUnmout');
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if(e.code === 'Escape'){
      console.log('push the button escape')
      this.props.onClose()
    }
    console.log(e.code)
    
  }


  render() {
    return (
      createPortal(<div className={s.overlay}>
        <div>{this.props.children}</div>
      
      </div>, modalRoot)
    );
  }
  //
};

export default Modal;
