import axios from 'axios';
import Notiflix from 'notiflix';

export async function addFetch(data) {
  const URL = 'https://tasty-treats-backend.p.goit.global/api/orders';

  return await axios
    .post(URL, data)
    .then(function (notif) {
      Notiflix.Notify.success('Post Success');
    })

    .catch(function (error) {
      Notiflix.Notify.failure(
        `${error.response.data.message}, please try again later`
      );
    });
}
