const button = document.querySelector('.button');
const table = document.querySelector('table > tbody');
const changeColor = document.querySelector('.change-color');
const intro = document.getElementById('hero');
const content = document.getElementById('content');
const nextPageBtn = document.querySelector('.pagination-next');
const prevPageBtn = document.querySelector('.pagination-previous');
const searchInput = document.querySelector('input[data-action="search"]');
console.log(searchInput);

let currentPage = 1;

const apiUrl =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=true&page=';

let graphArray; 
	
content.style.display = 'none';
searchInput.style.display = 'none';

const getData = _ => {
  return axios
    .get(apiUrl)
    .then(response => response.data)
    .catch(error => console.log(error)); // temporary library issues
};
const getDataFetch = _ => {
	return fetch(apiUrl + currentPage) 
		.then(response => response.json())
		.then(data => data)
		.catch(error => console.log(error));
};
const createItem = ({ 
	market_cap_rank, name, image, market_cap, current_price, high_24h, low_24h, price_change_percentage_24h, sparkline_in_7d, last_updated }) => {

		let date = new Date(last_updated).toLocaleTimeString();
		let color = '';
		if (price_change_percentage_24h > 0) {
			color = 'has-text-success';
			graphColor = 'sparkline-green sparkline-green-fill'
		} else {
			color = 'has-text-danger';
			graphColor = 'sparkline-red sparkline-red-fill'
		}
		graphArray = sparkline_in_7d.price;
		//console.log(graphArray);
		
		return `
			<tr>
				<th>${market_cap_rank}</th>
				<td class="pr0"><img src="${image}" alt="" width="25" height="25" /></td>
				<td class="pl0">${name}</td>
				<td>${current_price}</td>
				<td>${high_24h}</td>
				<td>${low_24h}</td>
				<td class="${color}">${price_change_percentage_24h.toFixed(2)}%</td>
				<td>${market_cap.toLocaleString()}</td>
				<td>
					<svg class="sparkline ${graphColor}" width="100" height="30" stroke-width="1"></svg>
				</td>
				<td>${date}</td>
			</tr>
		`;
};

const createTable = array => {
	const dataTable = array.map(item => createItem(item)).join(' ');
	table.innerHTML = dataTable;
	
	const addGraph = _ => {
		document.querySelectorAll('.sparkline').forEach(svg => sparkline.sparkline(svg, [1,7,4,9,2,4,1,8]));	
	}
	setTimeout(addGraph, 100);
};

checkCurrentPage = _ => {
	if (currentPage === 1) {
		prevPageBtn.style.display = 'none';
	} else {
		prevPageBtn.style.display = 'block';
	}
}

const loadContent = () => {
	
	getDataFetch().then(createTable);
	intro.style.display = 'none';
	content.style.display = 'block';
	searchInput.style.display = 'block';
	checkCurrentPage();

	//console.log(graphArray);
};

const loadNextPage = _ => {
	currentPage++;
	getDataFetch().then(createTable);
	checkCurrentPage();
}
const loadPrevPage = _ => {
	currentPage--;
	getDataFetch().then(createTable);
	checkCurrentPage();
}

button.addEventListener('click', loadContent);
nextPageBtn.addEventListener('click', loadNextPage);
prevPageBtn.addEventListener('click', loadPrevPage);



