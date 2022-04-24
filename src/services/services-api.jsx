import axios from 'axios';
async function axiosApi(newImage, newPage) {
  return await axios.get(
    `https://pixabay.com/api/?q=${newImage}&page=${newPage}&key=24437827-e20f686b1c65a4a2859f17630&image_type=photo&orientation=horizontal&per_page=12`
  );
}

const api = { axiosApi };

export default api;
