import axios from 'axios';
import PropTypes from 'prop-types';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '35306825-77139744492b195714f08c4a6',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchQueryImg = async (searchQuery, page) => {
  const { data } = await instance.get('/', {
    params: {
      q: searchQuery,
      page,
    },
  });
  return data;
};

searchQueryImg.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default searchQueryImg;
