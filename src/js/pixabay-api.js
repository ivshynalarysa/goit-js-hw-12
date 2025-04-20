
import axios from "axios";

const API_KEY = "49795001-63fc88dd531083a7427250d55";

const axiosInstance = axios.create({
	baseURL: 'https://pixabay.com/api/',
	params: {
		key: API_KEY,
		image_type: 'photo',
		orientation: 'horizontal',
		safesearch: true,
	},
});

export function getImagesByQuery(query) {
	return axiosInstance.get('', { params: { q: query } }).then(response => {
		if (response.data.hits.length === 0) {
			throw new Error('No images found');
		}
		return response.data;
	});
}

//. Ця функція повинна 
// приймати один параметр query (пошукове слово, яке є рядком), 
// здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.