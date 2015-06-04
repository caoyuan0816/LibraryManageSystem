// book search page script
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]);
	return null;
}

// book search ajax
function bookSearchAjax(paras) {
	//console.log(paras);
	$.post('/api/book-search/', paras, function (data) {
		console.log('book-search');
		console.log(data);
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
	             	// pages = 10;
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
	var classify = getUrlParam('class');
	var paras = {}
	paras['page'] = pageNumber;
	paras['classify'] = classify;
	// console.log(paras);
	bookSearchAjax(paras);
}

$(function() {
	freshBookList(1);
	$('.pagination').on('click', 'span', function(event) {
		event.preventDefault();
		/* Act on the event */
		//alert( $( this ).text() );
		var page = parseInt($(this).text());
		freshBookList(page);
	});
	$('#searchBtn').on('click', function(event) {
		event.preventDefault();
		var paras = {};
		paras["page"] = 1;
		paras["type"] = 	$('#searchType').val();
		paras["value"] = $('#searchValue')[0].value;
		console.log(paras);
		bookSearchAjax(paras);
	});
});