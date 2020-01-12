const axios = require('axios');

export default function getData(query) {
	const apiUrl =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=true&page=';

  return axios
    .get(apiUrl + query)
    .then(response => response.data)
    .catch(error => console.log(error));
};