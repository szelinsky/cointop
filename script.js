const button = document.querySelector('.button');
const table = document.querySelector('table > tbody');
const changeColor = document.querySelector('.change-color');
const intro = document.getElementById('hero');
const content = document.getElementById('content');
const apiUrl =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true';

let graphArray; 
	
content.style.display = 'none';

const getData = () => {
  return axios
    .get(apiUrl)
    .then(response => response.data)
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
	
	function addGraph() {
		document.querySelectorAll('.sparkline').forEach(svg => sparkline.sparkline(svg, [1,7,4,9,2,4,1,8]));
		
	}
	setTimeout(addGraph, 100);
};


const loadContent = () => {
	getData().then(createTable);
	intro.style.display = 'none';
	content.style.display = 'block';
	console.log(graphArray);
};
button.addEventListener('click', loadContent);
