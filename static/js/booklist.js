// book search page script 
$(function() {
	$.post('/api/book-search/', {page: '1'}, function (data) {
		// console.log('book-search');
		console.log(data);
            if (data.status) {
            	$('.book-dis').empty();
                for (var i =0 ; i < data.length; i++) {
                	var bookDom = '<li>'
					               	+'<a href="">'
					               	+'<img src="/static/images/bk2.jpg" alt=""/>'
					               	+'<p>' +data[i].booName+'</p>'
					                	+'</a>'
					              + '</li>';
			$('.book-dis').append(bookDom); 
               }	
            } else {
               alert("hello");
            }
        });
});