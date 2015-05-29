// book search page script 
function freshBookList(pageNumber) {
	$.post('/api/book-search/', {page: pageNumber}, function (data) {
		console.log('book-search');
		console.log(data);
            	if (data.status) {
            		$('.book-dis').empty();
	              	for (var i =0 ; i < data.length; i++) {
	              		var bookDom = '<li>'
						               	+'<a href="/book-detail/bookid=' +data[i].id +'">'
						               	+'<img src="' + data[i].photoURL +'" alt=""/>'
						               	+'<p>' +data[i].booName+'</p>'
						                	+'</a>'
					              		+ '</li>';
				$('.book-dis').append(bookDom); 
             		}
	             	var booksPerPage = 10;
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
		alert( $( this ).text() );
		var page = parseInt($(this).val());
		freshBookList(page);
	});
});