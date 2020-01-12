export default function(percent) {
	if (percent > 0 ) {
		return 'has-text-success';
	} else {
		return 'has-text-danger';
	}
};