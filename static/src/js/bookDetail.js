//get param from url
function getUrlParam(name){  
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
    var r = window.location.search.substr(1).match(reg);  
    if (r!==null) return unescape(r[2]);  
    return null;  
}
$(function(){
	var bookid = getUrlParam('bookid');
	console.log(bookid);
	$.post('/api/book-detail/', {bookid: bookid}, function(data) {
		/*optional stuff to do after success */
		if (data.status) {
			$('.book-content').empty();
			var bookDetailDom = '<div class="row">'
		              +'<div class="col-sm-6 book-pho">'
		                +'<a href="' + data["book"].photoURL + '">'
		                  +'<img src="'+ data["book"].photoURL  +'" alt=""/>'
		                +'</a>'
		              +'</div>'
		              +'<div class="col-sm-6 book-inf">'
		                +'<p><span>书名：</span><span>'+ data["book"].bookName + '</span></p>'
		                +'<p><span>作者：</span><span>'+data["book"].author + '</span></p>'
		                +'<p><span>出版社：</span><span>'+data["book"].publisher + '</span></p>'
		                +'<p><span>出版时间：</span><span>'+data["book"].publishTime + '</span></p>'
		                +'<p><span>ＩＳＢＮ码：</span><span>'+data["book"].isbn + '</span></p>'
		                +'<p><span>译者：</span><span>'+data["book"].translator + '</span></p>'
		                +'<p><span>现存量：</span><span>'+data["book"].currentStorage + '</span></p>'
		                +'<p>作者介绍：</p>'
		                +'<p>'+data["book"].authorIntroduction + '</p>'
		              +'</div>'
		            +'</div>'
		            +'<div class="row book-intr">'
		              +'<h4>内容简介：</h4>'
		              +'<pre>' +data["book"].bookIntroduction 
		              +'</pre>'
		            +'</div>';
			$('.book-content').append(bookDetailDom);
		}
	});
});