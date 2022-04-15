import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  tags,
}) {
  return (
    <li className={s.item}>
      <img src={webformatURL} alt={tags} className={s.img} />
    </li>
  );
}
