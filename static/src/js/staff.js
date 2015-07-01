$(function() {
	//submit borrow form
	$('#borrowForm #borrowBtn').on('click', function(event) {
		event.preventDefault();
		var borrowData = {};
		borrowData["username"] = $('#borrowUsername')[0].value;
		borrowData["book-id"] = $("#isbn")[0].value;
		console.log(borrowData);
		$.post('/api/borrow-book/', borrowData, function(data) {
			alertWithClose(data.message);
		});
	});
	$("#borrowForm").keydown(function(event) {
		if(event.keyCode == 13) {
			$("#borrowForm #borrowBtn").click();
		}	
	});
	//submit return form 
	$('#returnForm #returnBtn').on('click',  function(event) {
		event.preventDefault();
		/* Act on the event */
		var returnData = {};
		returnData["username"] = $('#returnUsername')[0].value;
		returnData["book-id"] = $("#isbn")[0].value;
		console.log(returnData);
		$.post('/api/borrow-book/', returnData, function(data) {
			console.log(data);
			alertWithClose(data.message);
		});
	});
	$("#returnForm").keydown(function(event) {
		if(event.keyCode == 13) {
			$("#returnForm #returnBtn").click();
		}	
	});
});