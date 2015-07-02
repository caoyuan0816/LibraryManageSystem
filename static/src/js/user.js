//fresh current records
function freshCurrentRecords() {
	var para = {};
	para['username'] = getUrlParam('username');
	$.post('/api/current-records/', para, function(data) {
		console.log(data);
	});
}
//fresh history  records 
function freshHistoryRecords() {
	var para = {};
	para['username'] = getUrlParam('username');
	$.post('/api/history-records', para, function(data) {
		console.log(data);
	});
}
$(function(){
	console.log('user.html');
	var currentUrl = window.location.href;
	if (currentUrl.indexOf('current-records') != -1) {
		freshCurrentRecords();
	}
	if (currentUrl.indexOf('history-records') != -1) {
		freshHistoryRecords();
	}
});