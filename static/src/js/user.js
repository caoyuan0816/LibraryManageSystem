Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//fresh current records
function freshCurrentRecords() {
	var para = {};
	para['username'] = getUrlParam('username');
	$.post('/api/current-records/', para, function(data) {
		console.log(data);
		if (data['status']) {
			var currentRecords = $('#currentRecords');
			for (var i = 0; i < data['records'].length; i++) {
				var borrowTime = new Date(data['records'][i].borrowdate);
				var returnTime = new Date(data['records'][i].returndate);
				console.log(borrowTime);
				var currentRecordsDom =  '<tr>'
											+'<td>' + data['records'][i].bookid + '</td>'
											+'<td>' + data['records'][i].bookname + '</td>'
											+'<td>' + data['records'][i].author + '</td>'
											+'<td>' + borrowTime.Format("yyyy-MM-dd hh:mm:ss") + '</td>'
											+'<td>' + returnTime.Format("yyyy-MM-dd hh:mm:ss")  + '</td>'
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
			// console.log(data);
			for (var i = 0; i < data['records'].length; i++) {
				var borrowTime = new Date(data['records'][i].borrowdate);
				var returnTime = new Date(data['records'][i].returndate);
				var actualReturnTime = "";
				if (data['records'][i].actualreturndate == -1) {
					actualReturnTime = '--';
				} else {
					actualReturnTime = new Date(data['records'][i].actualreturndate).Format("yyyy-MM-dd hh:mm:ss");
				}
				
				// console.log(borrowTime);
				var historyRecordsDom =  '<tr>'
											+'<td>' + data['records'][i].bookid + '</td>'
											+'<td>' + data['records'][i].bookname + '</td>'
											+'<td>' + data['records'][i].author + '</td>'
											+'<td>' + borrowTime.Format("yyyy-MM-dd hh:mm:ss") + '</td>'
											+'<td>' + returnTime.Format("yyyy-MM-dd hh:mm:ss")  + '</td>'
											+'<td>' + actualReturnTime + '</td>'
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
		console.log(data);
		// console.log($('.read-intr .borrowed span'));
		$('.read-intr .borrowed span').text(data['borrowed']);
		$('.read-intr .overdue span').text(data['overdue']);
		$('.read-intr .accumlated span').text(data['accumulated']);
	});
}
function feshUserFine() {
	var para = {};
	para['username'] = getUrlParam('username');
	$.post('/api/user-fine/', para, function(data) {
		if (data['status']) {
			var userFine = $('#userFine');
			console.log(data);
			for (var i = 0; i < data['records'].length; i++) {
				var borrowTime = new Date(data['records'][i].borrowdate);
				var returnTime = new Date(data['records'][i].returndate);
				var actualReturnTime = "";
				if (data['records'][i].actualreturndate== -1) {
					actualReturnTime = '--';
				} else {
					actualReturnTime = new Date(data['records'][i].actualreturndate).Format("yyyy-MM-dd hh:mm:ss");
				}
				var userFineDom =  '<tr>'
										+'<td>' + data['records'][i].bookid + '</td>'
										+'<td>' + data['records'][i].bookname + '</td>'
										+'<td>' + borrowTime.Format("yyyy-MM-dd hh:mm:ss") + '</td>'
										+'<td>' + returnTime.Format("yyyy-MM-dd hh:mm:ss")  + '</td>'
										+'<td>' + actualReturnTime + '</td>'
										+'<td>' + data['fines'][i] + '</td>'
									      +'</tr>';
				userFine.append(userFineDom);						      	
			}
		} else {
			alertWithClose('load error');
		}
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
	if(currentUrl.indexOf('user-fine') != -1) {
		feshUserFine();
	}

});