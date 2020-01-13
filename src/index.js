import './styles.css';
import 'bulma/css/bulma.css'
import fetchCoins from './js/fetchCoins'
import coinTableTemplate from './templates/coin-table-row.hbs'
import sparkline from "@fnando/sparkline";


const button = document.querySelector('.button');
const table = document.querySelector('table > tbody');
const intro = document.getElementById('hero');
const content = document.getElementById('content');
const nextPageBtn = document.querySelector('.pagination-next');
const prevPageBtn = document.querySelector('.pagination-previous');
const searchInput = document.querySelector('input[data-action="search"]');

let currentPage = 1;

content.style.display = 'none';
searchInput.style.display = 'none';

const createTable = array => {
	const sparklineArr = () => array.map(item => item.sparkline_in_7d.price);
	let elementSparkline = sparklineArr() 
	
	const dataTable = array.map(item => coinTableTemplate(item)).join(' ');
	table.innerHTML = dataTable;

	const addGraph = () => {
		for (let i = 0; i < 10; i++) {
			sparkline(document.querySelectorAll('.sparkline')[i], elementSparkline[i]
				.map(val => val - Math.min(...elementSparkline[i]))
			);	
		}
	};
	setTimeout(addGraph, 1000);
};

const checkCurrentPage = _ => {
	if (currentPage === 1) {
		prevPageBtn.style.display = 'none';
	} else {
		prevPageBtn.style.display = 'block';
	}
}

const loadContent = _ => {
	fetchCoins(currentPage).then(createTable);
	intro.style.display = 'none';
	content.style.display = 'block';
	searchInput.style.display = 'block';
	checkCurrentPage();
};

const loadNextPage = _ => {
	currentPage++;
	fetchCoins(currentPage).then(createTable);
	checkCurrentPage();
}

const loadPrevPage = _ => {
	currentPage--;
	fetchCoins(currentPage).then(createTable);
	checkCurrentPage();
}

button.addEventListener('click', loadContent);
nextPageBtn.addEventListener('click', loadNextPage);
prevPageBtn.addEventListener('click', loadPrevPage);




