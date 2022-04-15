import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ pictures }) {
  return (
    <ul className={s.gallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          webformatURL={picture.webformatURL}
          largeImageURL={picture.largeImageURL}
          tags={picture.tags}
        />
      ))}
    </ul>
  );
}
