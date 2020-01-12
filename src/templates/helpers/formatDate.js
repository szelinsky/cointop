module.exports = function(date) {
	const moment = require('moment');
	require('moment/locale/ru');
	moment.locale('ru');
	let formatDate = moment(date).startOf('hour').fromNow();
	return formatDate;
};