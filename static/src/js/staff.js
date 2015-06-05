$(function() {
	$('#borrowForm #borrowBtn').on('click', function(event) {
		event.preventDefault();
		var borrowData = {};
		borrowData["username"] = $('#username')[0].value;
		borrowData["isbn"] = $("#isbn")[0].value;
		$.post('/api/borrow-book/', borrowData, function(data) {
			/*optional stuff to do after success */
			console.log(data);
			alertWithClose(data.message);
		});
	});
	$('#returnForm #returnBtn').on('click',  function(event) {
		event.preventDefault();
		/* Act on the event */
		var returnData = {};
		returnData["username"] = $('#username')[0].value;
		returnData["isbn"] = $("#isbn")[0].value;
		$.post('/api/borrow-book/', returnData, function(data) {
			/*optional stuff to do after success */
			console.log(data);
			alertWithClose(data.message);
		});
	});
});