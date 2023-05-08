import { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const Modal = ({ close, children }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  });

  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>{children}</div>
    </div>
  );
};
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
