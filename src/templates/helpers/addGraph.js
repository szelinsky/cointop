import sparkline from "@fnando/sparkline";
export default function() {
	document.querySelector('.sparkline').forEach(svg => sparkline.sparkline(svg, [1,7,4,9,2,4,1,8]));	
	//console.log(sparklineArr);
};