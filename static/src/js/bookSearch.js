// book search page script
// get para of url
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]);
	return null;
}
// book search ajax
function bookSearchAjax(paras) {
	$.post('/api/book-search/', paras, function (data) {
		// console.log(data);
		if (data.status) {
			$('.book-dis').empty();
			for (var i =0 ; i < data.book_list.length; i++) {
				var bookDom = '<li>'
				+'<a href="/book-detail/?bookid=' +data.book_list[i].id +'">'
				+'<img src="' + data.book_list[i].photoURL +'" alt=""/>'
				+'<p>' +data.book_list[i].bookName+'</p>'
				+'</a>'
				+ '</li>';
				$('.book-dis').append(bookDom); 
			}
			var booksPerPage = 8;
			var all_number = data.all_number;
			var pages = all_number / booksPerPage;
			if (all_number % booksPerPage != 0) {
				pages ++;
			}
			$('.pagination').empty();
			for (var i = 1; i <= pages; i++) {
				var pgDom = '<li>'
				+'<span>' + i + '</span>'
				+'</li>';
				$('.pagination').append(pgDom);
			}
		} else {
			alertFun("not found book!");
			setTimeout(function () {
				$('#alertModal').modal("hide");
			}, 1200);
		}
	});
} 

//fresh boolk list
function freshBookList(pageNumber) {
	var paras = {}
	paras['page'] = pageNumber;
	paras['classify'] = "";
	var globalSearchDataStr = localStorage.getItem("globalSearchData");
	var globalSearchData = JSON.parse(globalSearchDataStr);
	console.log(globalSearchDataStr);
	paras["type"] = 	globalSearchData["searchType"];
	paras["value"] = globalSearchData["searchValue"];
	//console.log(paras);
	bookSearchAjax(paras);
}

var globalParas = {}; //global param

$(function() {	
	var currentUrl = window.location.href;
	if (currentUrl.indexOf("book-search") != -1) {
		freshBookList(1);
	}
	$('.pagination').on('click', 'span', function(event) {
		event.preventDefault();
		var page = parseInt($(this).text());
		paras = {};
		globalParas["page"] = page;
		bookSearchAjax(globalParas);
	});
	//click category list 
	$('#categoryList').on('click', 'a', function(event) {
		event.preventDefault();
		// clear the search form data from globalParams
		globalParas["type"] = "";
		globalParas["value"] = "";
		var paras = {};
		paras["classify"] = $(this).data('class');
		paras["page"] = 1;
		globalParas["classify"] = paras["classify"];
		// console.log(paras);
		if (currentUrl.indexOf("book-search") != -1) {
			console.log('ajax');
			globalParas["classify"] = "";
			var paras = {};
			paras["page"] = 1;
			paras["type"] = 	$('#searchType').val();
			paras["value"] = $('#searchValue')[0].value;
			globalParas["type"] = paras["type"];
			globalParas["value"] = paras["value"];
			// console.log(paras);
			bookSearchAjax(paras);
		}  else {
			console.log("reload");
			var globalSearchData = {};
			
			globalSearchData["searchType"] = $('#searchType').val();;
			globalSearchData["searchValue"] = $('#searchValue')[0].value;
			var globalSearchDataStr = JSON.stringify(globalSearchData);
			localStorage.setItem("globalSearchData", globalSearchDataStr);
			window.location.href = "/book-search/";
		}

		// bookSearchAjax(paras);
	});
	
	// click the search button
	$('#searchBtn').on('click', function(event) {
		event.preventDefault();
		// clear the category of globalParas
		//console.log( window.location.href);
		var currentUrl = window.location.href;
		currentUrl.indexOf("book-search")
		console.log(currentUrl.indexOf("book-search"));
		if (currentUrl.indexOf("book-search") != -1) {
			console.log('ajax');
			globalParas["classify"] = "";
			var paras = {};
			paras["page"] = 1;
			paras["type"] = 	$('#searchType').val();
			paras["value"] = $('#searchValue')[0].value;
			globalParas["type"] = paras["type"];
			globalParas["value"] = paras["value"];
			// console.log(paras);
			bookSearchAjax(paras);
		}  else {
			console.log("reload");
			var globalSearchData = {};
			globalSearchData["searchType"] = $('#searchType').val();;
			globalSearchData["searchValue"] = $('#searchValue')[0].value;
			var globalSearchDataStr = JSON.stringify(globalSearchData);
			localStorage.setItem("globalSearchData", globalSearchDataStr);
			window.location.href = "/book-search/";
		}
	});
	$("#searchForm .form-group").keydown(function(event) {
		if (event.keyCode == 13) {
			$("#searchBtn").click();
		
		}
	});
	
});