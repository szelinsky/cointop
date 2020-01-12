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

let graphArray; 
	
content.style.display = 'none';
searchInput.style.display = 'none';


const createTable = array => {
	const dataTable = array.map(item => coinTableTemplate(item)).join(' ');
	table.innerHTML = dataTable;
	
	const addGraph = _ => {
		document.querySelectorAll('.sparkline').forEach(svg => sparkline(svg, [1,7,4,9,2,4,1,8]));	
	}
	setTimeout(addGraph, 100);
};

const checkCurrentPage = _ => {
	if (currentPage === 1) {
		prevPageBtn.style.display = 'none';
	} else {
		prevPageBtn.style.display = 'block';
	}
}

const loadContent = () => {
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




