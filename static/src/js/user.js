//fresh current records
function freshCurrentRecords() {
	var para = {};
	para['username'] = getUrlParam('username');
	$.post('/api/current-records/', para, function(data) {
		if (data['status']) {
			var currentRecords = $('#currentRecords');
			for (var i = 0; i < data['records'].length; i++) {
				var currentRecordsDom =  '<tr>'
											+'<td>' + data['records'][i].bookid + '</td>'
											+'<td>' + data['records'][i].bookName + '</td>'
											+'<td>' + data['records'][i].author + '</td>'
											+'<td>' + data['records'][i].borrowtime + '</td>'
											+'<td>' + data['records'][i].actualreturntime  + '</td>'
										      +'</tr>';
				currentRecords.append(currentRecordsDom);						      	
			}
		} else {
			alertWithClose('load error');
		}
		console.log(data);
	});
}
//fresh history  records 
function freshHistoryRecords() {
	var para = {};
	para['username'] = getUrlParam('username');
	$.post('/api/history-records/', para, function(data) {
		if (data['status']) {
			var historyRecords = $('#historyRecords');
			console.log(data);
			for (var i = 0; i < data['records'].length; i++) {
				var historyRecordsDom =  '<tr>'
											+'<td>' + data['records'][i].bookid + '</td>'
											+'<td>' + data['records'][i].bookName + '</td>'
											+'<td>' + data['records'][i].author + '</td>'
											+'<td>' + data['records'][i].borrowtime + '</td>'
											+'<td>' + data['records'][i].actualreturntime  + '</td>'
										      +'</tr>';
				historyRecords.append(historyRecordsDom);						      	
			}
		} else {
			alertWithClose('load error');
		}
	});
}

//fresh user information page 
function freshUserInformationPage() {
	var para = {};
	para['username'] = getUrlParam('username');
	$.post('/api/user/', para, function(data) {
		// console.log(data);
		// console.log($('.read-intr .borrowed span'));
		$('.read-intr .borrowed span').text(data['borrowed']);
		$('.read-intr .overdue span').text(data['overdue']);
		$('.read-intr .accumlated span').text(data['accumulated']);
	});
}

$(function(){
	// console.log('user.html');
	var currentUrl = window.location.href;
	if (currentUrl.indexOf('current-records') != -1) {
		freshCurrentRecords();
	}
	if (currentUrl.indexOf('history-records') != -1) {
		freshHistoryRecords();
	}
	if(currentUrl.indexOf('user?') != -1) {
		freshUserInformationPage();
	}
});