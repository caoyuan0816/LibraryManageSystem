// book search page script
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]);
	return null;
}

function freshBookList(pageNumber) {
	//console.log(pageNumber);
	var classify = getUrlParam('class');
	var paras = {}
	paras['page'] = pageNumber;
	paras['classify'] = classify;

	console.log(paras);
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
               alert("hello");
            }
        });
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
});