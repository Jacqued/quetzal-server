module.exports = {
	response: function (res, err, identifier) {
		// Log the error as it can be useful later
		console.log('Error ' + identifier + ' : ' + err);
		// Then send a 500 response with the error appended
		res.send(500, 'Internal server error ' + identifier + ' : ' + err);
	},
	nudelog: function (err, identifier) {
		// Log the error as it can be useful later
		console.log('Error ' + identifier + ' : ' + err);
	}	
}