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
	console.log(paras);
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
	paras["type"] = 	$('#searchType').val();
	paras["value"] = $('#searchValue')[0].value;
	console.log(paras);
	bookSearchAjax(paras);
}

var globalParas = {}; //global param

$(function() {	
	freshBookList(1);
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
		bookSearchAjax(paras);
	});
	
	// click the search button
	$('#searchBtn').on('click', function(event) {
		event.preventDefault();
		// clear the category of globalParas
		globalParas["classify"] = "";
		var paras = {};
		paras["page"] = 1;
		paras["type"] = 	$('#searchType').val();
		paras["value"] = $('#searchValue')[0].value;
		globalParas["type"] = paras["type"];
		globalParas["value"] = paras["value"];
		// console.log(paras);
		bookSearchAjax(paras);
	});
});