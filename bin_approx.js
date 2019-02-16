//import math.js
const math = require('mathjs');
function median_approx(values, num_bins) {

	var N = values.length;

	//find mean
	var mean = math.mean(values);
	
	//find standard deviation
	var std = math.std(values, 'uncorrected');
	
	//define bounds, minval = u-sigma, maxval = u+sigma
	var minval = mean - std;
	var maxval = mean + std;
	//console.log("minval : " + minval);
	//console.log("maxval : " + maxval);
	//set the bin width, bin_width = 2*sigma/num_bins
	var bin_width = (2*std)/num_bins;

	//define ignore bin
	var zero_bin = 0;

	//define num_bins bins to count values in these and make array bins_boundaries
	var bins = new Array(num_bins);
	for(var i = 0; i < bins.length; i++) {
		bins[i] = 0;
	}
	var bins_boundaries = new Array(num_bins + 1);
	var j = minval, i = 0;
	while(j <= maxval) {
		bins_boundaries[i] = j;
		i+=1;
		j = j + bin_width;
	}
	//count the number of values falling into each bin
  	for (var i = 0; i < values.length; i++) {
  		if(values[i] < (mean - std)) {
  			zero_bin += 1;
  		}
  		else if(values[i] < (mean + std)) {
  			index = Math.trunc((values[i] - (mean - std))/ bin_width);
  			bins[index] += 1;
  		}
  	}
    //console.log(bins);
	//sum these counts starting from ignore bin until sum >= (N+1)/2
	var mid = (N + 1)/2;
	var index = 0;
	var sum = zero_bin;
	for(var i = 0; i < bins.length; i++) {
		sum += bins[i];
		if(sum >= mid) {
			index = i;
			break;
		}
	}
	//print the mid point of bin that exceedid (N+1)/2
	var median_approx = (bins_boundaries[index] + bins_boundaries[index+1])/2;
	console.log("Median by bin_approx : "+ median_approx);
}

//Generating 10000 random numbers
var n = 1000000;
var values = new Array(n);
for(var i = 0; i < n; i++) {
	values[i] = Math.floor(Math.random()*100);
}

var num_of_bins = 150;

console.time('median_approx');
median_approx(values, 15);
console.timeEnd('median_approx');

console.log();

console.time('median_mathjs');
var median_mathjs = math.median(values);
console.log("Median by mathjs library : " + median_mathjs);
console.timeEnd('median_mathjs');
