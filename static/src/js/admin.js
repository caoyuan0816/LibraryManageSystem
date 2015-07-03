function getBookList() {
	var paras = {};
	paras['page'] = 1;
	paras['classify'] = "";
	paras['type'] = "";
	paras['value'] = "";
	$.post('/api/book-search/', paras, function(data) {
		/*optional stuff to do after success */
		if (data.status) {
			// console.log(data);
			var manageBook = $('#manageBook');
			for (var i = 0; i < data.book_list.length; i++) {
				var bookDom ='<tr>'
									+'<td><img class="bookBarcode" id="'+data.book_list[i].id+'" style="width:400px;" /></td>'
									+'<td class="bookid">' + data.book_list[i].id + '</td>'
									+'<td>' + data.book_list[i].bookName + '</td>'
									+'<td>' + data.book_list[i].author + '</td>'
									+'<td><a data-toggle="modal" data-target=".modify-modal" class="modifyBook">modify</a><span> | </span><a class="deleteBook">delete</a></td>'
								 +'</tr>';
				manageBook.append(bookDom);
			}
			getBookBarcode();
		}
	});
}
function getBookBarcode() {
	var $imgList = $('.bookBarcode');
	console.log($imgList);
	for (var i = 0; i < $imgList.length; i++) {
		$imgElem = $imgList[i];
		var bookId = $imgList[i].id;
		// console.log($imgList[i].id);
		// var $bookId = $imgElem.siblings('.bookid').text();
		console.log(typeof $('#'+bookId).JsBarcode);
		JsBarcode($imgElem,bookId,{format:"CODE128",displayValue:true,fontSize:20});
	}
}
$(function(){
	getBookList();
	// getBookBarcode();
	$('#manageBook').on('click', 'a' , function(event) {
		event.preventDefault();
		/* Act on the event */
		var $target = $(this);
		// console.log($(this).parent().siblings('.bookid').text());
		var para = {};
		para['book-id'] = $(this).parent().siblings('.bookid').text();
		if ($(this).attr('class') == 'modifyBook') {
			// console.log('modify');
			var paras = {};
		        paras['bookname']=$('#bookName').val();
		        paras['author']=$('#author').val();
		        paras['publisher']=$('#publisher').val();
		        paras['publishtime']=$('#publishTime').val();
		        paras['isbn']=$('#ISBN').val();
		        paras['translator']=$('#translator').val();
		        paras['photoURL']=$('#photoUrl').val();
		        paras['authorintro']=$('#authorIntroduction').val();
		        paras['bookintro']=$('#bookIntroduction').val();

		        $('#modifyBookBtn').on('click', function(event) {
		        	event.preventDefault();
		        	/* Act on the event */
		        	$.post('/api/modify-book/',paras, function(data) {
		        		/*optional stuff to do after success */
			        	if (data.status) {
			                 alertFun(data.message);
			                 setTimeout(function () {
			                    $('#alertModal').modal("hide");
			                    location.reload();
			                 }, 1200);
			              } else {
			                 alertWithClose(data.message);
			              }
		        	});
		        });
		} else {
			var $confirm = confirm('Do you really want to delete the book?');
			if ($confirm == true) {
				// console.log(para);
				$.post('/api/delete-book/', para, function(data) {
					/*optional stuff to do after success */
					if (data.status) {
						$target.parent().parent().hide('400');
						alertWithClose('delete successfully')
					} else {
						alertWithClose('delete fail');
					}
				});
			}
		}
	});

});