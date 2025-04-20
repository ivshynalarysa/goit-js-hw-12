
import axios from "axios";

const API_KEY = "49795001-63fc88dd531083a7427250d55";

export async function getImagesByQuery(query, page) {
    return await axios("https://pixabay.com/api/", {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 15,
            page: page,
        }
    })
}

//Ця функція повинна приймати два параметри query (пошукове слово,
//  яке є рядком) та page (номер сторінки, яка є числом), здійснювати HTTP-запит 
// і повертати значення властивості data з отриманої відповіді.