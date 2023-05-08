import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import searchQueryImg from 'services/api';
import Button from 'components/Button/Button';
import Modal from './Modal/Modal';
import ImageDetails from './ImageDetails/ImageDetails';

import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imgDetails, setImgDetails] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchImg = async () => {
      try {
        setLoading(true);
        const data = await searchQueryImg(searchQuery, page);

        setTotalHits(data.totalHits);

        if (data.hits.length === 0) {
          toast.info(
            'The search has not given any results. Try to find something else'
          );
        }
        setItems(prevItems => [...prevItems, ...data.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImg();
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setItems([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showImage = largeImageURL => {
    setImgDetails(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setImgDetails(null);
    setShowModal(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} />
      <ImageGallery items={items} showImage={showImage} />

      {loading && <Loader />}
      {error && <p>An error has occurred. Please try again later...</p>}

      {totalHits > items.length && items.length > 0 && (
        <Button text={'Load more'} onClick={loadMore} />
      )}

      {showModal && (
        <Modal close={closeModal}>
          <ImageDetails {...imgDetails} />
        </Modal>
      )}
    </div>
  );
};
