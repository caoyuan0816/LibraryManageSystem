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

	$('#returnForm #isbn').on('blur',  function(event) {
		event.preventDefault();
		/* Act on the event */
		console.log('blur');
		var returnData = {};
		returnData["username"] = $('#returnUsername')[0].value;
		returnData["book-id"] = $("#isbn")[0].value;
		console.log(returnData);
		$.post('/api/single-fine/', returnData, function(data) {
			/*optional stuff to do after success */
				console.log(data);
				if (data == -1) {
					alertWithClose('please input data');
				} 
				if (data >= 0.0) {
					var $confirm = confirm('Need to pay ' + data + '$');
					if ($confirm) {
						console.log('true');
						$('#returnForm #returnBtn').css({
							display: 'inline'
						});
					} 
				}
		});
	});
	//submit return form 
	$('#returnForm #returnBtn').on('click',  function(event) {
		event.preventDefault();
		/* Act on the event */
		var returnData = {};
		returnData["username"] = $('#returnUsername')[0].value;
		returnData["book-id"] = $("#isbn")[0].value;
		console.log(returnData);
		$.post('/api/return-book/', returnData, function(data) {
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