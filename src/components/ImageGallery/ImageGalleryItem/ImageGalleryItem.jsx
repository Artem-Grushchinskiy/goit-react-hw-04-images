import React from 'react';
import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ srcImg, showImg }) => {
  return (
    <li onClick={showImg} className={css.galleryItem}>
      <img
        src={srcImg}
        alt=""
        loading="lazy"
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  srcImg: PropTypes.string.isRequired,
  showImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
