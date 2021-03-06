function getBookList() {
	var paras = {};
	paras['page'] = 1;
	paras['classify'] = "";
	paras['type'] = "";
	paras['value'] = "";
	paras['all'] = "true";
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
//get param from url
function getUrlParam(name){  
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
    var r = window.location.search.substr(1).match(reg);  
    if (r!==null) return unescape(r[2]);  
    return null;  
}
$(function(){
	var bookid = getUrlParam('bookid');
	 
	$.post('/api/book-detail/', {bookid: bookid}, function(data) {
		/*optional stuff to do after success */
		// console.log(data);
		if (data.status) {
			$('.book-content').empty();
			// var borrowDom = "";
			var borrowFlag = "";
			if(data["book"].borrowed){
				borrowFlag = '<button type="button" class="btn btn-danger" style="margin-left: 30px;" disabled>' + 'can not  borrow' + '</button>';
			}else{
				borrowFlag = '<button type="button" class="btn btn-success" style="margin-left: 30px;" disabled>' + 'can borrow' +'</button>';
			}

			var bookDetailDom = '<div class="row">'
		              +'<div class="col-sm-6 book-pho">'
		                +'<a href="' + data["book"].photoURL + '">'
		                  +'<img src="'+ data["book"].photoURL  +'" alt=""/>'
		                +'</a>'
		              +'</div>'
		              +'<div class="col-sm-6 book-inf">'
		                +'<p style="font-size: 22px;"><span>Book name:</span><span>'+ data["book"].bookName + '</span>' +borrowFlag+'</p>'
		                +'<p><span>Author:</span><span>'+data["book"].author + '</span></p>'
		                +'<p><span>Press:</span><span>'+data["book"].publisher + '</span></p>'
		                +'<p><span>Press time:</span><span>'+data["book"].publishTime + '</span></p>'
		                +'<p><span>ISBN:</span><span>'+data["book"].isbn + '</span></p>'
		                +'<p><span>Translator:</span><span>'+data["book"].translator + '</span></p>'
		                //+'<p><span>现存量：</span><span>'+data["book"].currentStorage + '</span></p>'
		                +'<p>Author description:</p>'
		                +'<p>'+data["book"].authorIntroduction + '</p>'
		              +'</div>'
		            +'</div>'
		            +'<div class="row book-intr">'
		              +'<h4>Content description:</h4>'
		              +'<pre>' +data["book"].bookIntroduction 
		              +'</pre>'
		            +'</div>';
			$('.book-content').append(bookDetailDom);
		}
	});
});
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
		console.log(data);
		if (data.status) {
			$('.book-dis').empty();
			// console.log(data.book_list.length);
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
	// paras['classify'] = "";
	var globalSearchDataStr = localStorage.getItem("globalSearchData");
	var globalSearchData = JSON.parse(globalSearchDataStr);
	console.log(globalSearchDataStr);
	paras["type"] = 	globalSearchData["searchType"];
	paras["value"] = globalSearchData["searchValue"];
	paras["classify"] = globalSearchData['classify'];
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
			// console.log('ajax');
			// globalParas["classify"] = "";
			// var paras = {};
			// paras["page"] = 1;
			// paras["type"] = 	$('#searchType').val();
			// paras["value"] = $('#searchValue')[0].value;
			// globalParas["type"] = paras["type"];
			// globalParas["value"] = paras["value"];
			// console.log(paras);
			bookSearchAjax(paras);
		}  else {
			// console.log("reload");
			var globalSearchData = {};
			globalSearchData["classify"] = paras['classify'];
			globalSearchData["searchType"] = "";
			globalSearchData["searchValue"] = "";
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
// <<<<<<< HEAD
// /**
//  * Created by superpig on 15/5/17.
//  */
// //校验登陆字段是否正确
// function loginCheck() {
//     // 返回的是一个validate对象，这个对象有一个form方法，返回的是是否通过验证
//     return $("#loginForm").validate({
//         rules: {
//             username: {
//                 required: true
//             },
//             password: {
//                 required: true
//             }
//         },
//         messages: {
//             username: {
//                 required: "Username couldn't be null"
//             },
//             password: {
//                 required: "Password couldn't be null"
//             }
//         }
//     });
// }
// //验证注册字段是否正确
// function registCheck() {
//     return $('#registForm').validate({
//         rules: {
//             schoolId: {
//                 required: true,
//                 maxlength: 10,
//                 minlength: 10
//             },
//             registUsername: {
//                 required: true
//             },
//             email: {
//                 required: true,
//                 email: true
//             },
//             registPassword: {
//                 required: true,
//                 minlength: 6,
//                 maxlength: 20
//             },
//             conPassword: {
//                 required: true,
//                 minlength: 6,
//                 maxlength: 20,
//                 equalTo: "#registPassword"
//             }
//         },
//         messages: {
//             schoolId: {
//                 required: "StudentID couldn't be null",
//                 maxlength: "The length of StudentID is 10",
//                 minlength: "The length of StudentID is 10"
//             },
//             registUsername: {
//                 required: "Nickname couldn't be null"
//             },
//             email: {
//                 required: "Email couldn't be null",
//                 email: "The format of email is incorrect"
//             },
//             registPassword: {
//                 required: "Password couldn't be null",
//                 minlength: "The minimum length of password is 6",
//                 maxlength: "The maximum length of password is 20"
//             },
//             conPassword: {
//                 required: "Password couldn't be null",
//                 minlength: "The minimum length of password is 6",
//                 maxlength: "The maximum length of password is 20",
//                 equalTo: "Please input the same password twice"
//             }
//         }
//     });
// }
// function modifyPassCheck() {
//     return $('#modifyForm').validate({
//         rules: {
//             oldPassword: {
//                 required: true,
//                 minlength: 6,
//                 maxlength: 20
//             },
//             newPassword: {
//                 required: true,
//                 minlength: 6,
//                 maxlength: 20
//             },
//             conNewPassword: {
//                 required: true,
//                 minlength: 6,
//                 maxlength: 20,
//                 equalTo: "#newPassword"
//             }
//         },
//         messages: {
//             oldPassword: {
//                 required: "Password couldn't be null",
//                 minlength: "The minimum length of password is 6",
//                 maxlength: "The maximum length of password is 20"
//             },
//             newPassword: {
//                 required: "Password couldn't be null",
//                 minlength: "The minimum length of password is 6",
//                 maxlength: "The maximum length of password is 20"
//             },
//             conNewPassword: {
//                 required: "Password couldn't be null",
//                 minlength: "The minimum length of password is 6",
//                 maxlength: "The maximum length of password is 20",
//                 equalTo: "Please input the same password twice"
//             }
//         }
//     });
// }
// //保存用户名和密码
// function saveUserInf() {
//     if ($('#rmbUser').get(0).checked) {
//         var str_username = $("#username").val();
//         var str_password = $("#password").val();
//         //$.cookie('name', 'value', { expires: 7 });
//         $.cookie('rmbUserFlag', 'true', {expires: 7});
//         $.cookie('username', str_username, {expires: 7});
//         $.cookie('password', str_password, {expires: 7});
//     } else {
//         $.cookie('rmbUserFlag', 'false', {expires: -1});
//         $.cookie('username', "", {expires: -1});
//         $.cookie('password', "", {expires: -1});
//     }
//     console.log($.cookie('username'));
//     console.log($.cookie('password'));
// }

// //alert function
// function alertFun(msg) {
//     $('#alertMsg').text(msg);
//     // make the modal in the center area
//     $('#alertModal').on('show.bs.modal', function () {
//         console.log("alertModal");
//         var $this = $(this);
//         var $modalDialog = $this.find('.modal-dialog');
//         var mTop = ( $(window).height() - $modalDialog.height() ) / 2;
//         $modalDialog.css({'margin': mTop + 'px auto'});
//     });
//     $('#alertModal').modal('show');
// }
// //auto close alert function
// function alertWithClose(msg) {
//     alertFun(msg);
//     setTimeout(function(){
//         $('#alertModal').modal('hide');
//     }, 1500);
// }

// $(function () {

//     // 判断用户的登陆信息是否存在cookie中
//     if ($.cookie('rmbUserFlag') == 'true') {
//         $("#rmbUser").attr("checked", true);
//         $("#username").val($.cookie("username"));
//         $("#password").val($.cookie("password"));
//     }
//     // don't save username and password
//     if (!$('#rmbUser').get(0).checked) {
//       $.cookie('rmbUserFlag', 'false', {expires: -1});
//       $.cookie('username', "", {expires: -1});
//       $.cookie('password', "", {expires: -1});
//     }
//     // 点击登录按钮，开始表单验证，如果数据无误，向服务器提交数据
//     $("#login").on('click', function(event) {
//         event.preventDefault();
//         /* Act on the event */
//         saveUserInf();
//         if (!loginCheck().form()) return;
//         var loginData = {};
//         loginData['username'] = $("#username")[0].value;
//         loginData['password'] = $("#password")[0].value;

//         $.post('/api/login', loginData, function (data) {
//             /*optional stuff to do after success */
//             var abc = "'";
//             var re = new RegExp(abc, 'g');
//             data = data.replace(re, '"');
//             //var data2 = '{"status":true,"message":"loginsuccess!"}';
//             console.log(JSON.parse(data));
//             var res = JSON.parse(data);

//             if (res.status == "true") {
//                 $('#loginModal').modal("hide");
//                 alertFun("Login Success!")
//                 setTimeout("javascript:location.reload()", 1500);
//             } else {
//                 $('.login-error').css({
//                     display: 'block'
//                 });
//                 $('.login-error').text(res.message);
//             }
//         });
//     });
//     $('#loginForm').keydown(function(event) {
//         console.log('keydown');
//         if (event.keyCode == 13) {
//             $('#login').click();
//         }
//     });

//     // 点击注册按钮，开始表单验证，如果数据无误，向服务器提交数据
//     $("#regist").on('click', function(event) {
//         event.preventDefault();
//         if (!registCheck().form()) return;
//         var registData = {};
//         //registData['schoolId'] = $("#schoolId")[0].value;
//         registData['email'] = $("#email")[0].value;
//         //registData['registPassword'] = $("#registPassword")[0].value;
//         registData['username'] = $("#registUsername")[0].value;
//         registData['password'] = $("#conPassword")[0].value;
//         console.log(registData);
//         $.post('/api/register/', registData, function (data) {
//             console.log(data);
//             if (data.status) {
//                 $("#registModal").modal("hide");
//                 alertWithClose("Regist Success!");
//             } else {
//                 $('.regist-error').css({
//                     display: 'block'
//                 });
//                 $('.regist-error').text(data.message);
//             }
//         });
//     });
//     $("#registForm").keydown(function(event) {
//         if(event.keyCode == 13) {
//             $("#regist").click();
//         }
//     });
//     $('#modify').on('click', function () {
//         if (!modifyPassCheck().form()) return;
//         var modifyData = {};
//         modifyData['password'] = $('#oldPassword')[0].value;
//         modifyData['newpassword'] = $('#newPassword')[0].value;
//         modifyData['username'] = getUrlParam('username');
//         console.log(modifyData);
//         $.post('/api/reset-password/', modifyData, function (data) {
//             if (data.status) {
//                 $('#modifyModal').modal("hide");
//                 alertWithClose("Modify password successfully!");
//             } else {
//                 $('.modify-error').css({
//                     display: 'block'
//                 });
//                 $('.modify-error').text(data.message);
//             }
//         });
//     });
//     $('#forgetBtn').on('click', function (event) {
//         $('#forgetBtn').attr("disabled", "disabled");
//         var Data = {};
//         Data['email'] = $('#email-input')[0].value;
//         console.log(Data);
//         $.post('/api/forget-password/', Data, function (data) {
//             if (data.status) {
//                 alertFun("Sent success! Please check your email:)");
//                 setTimeout(function () {
//                     $('#alertModal').modal("hide");
//                     window.location.href='http://test.yuan25.com';
//                 }, 1200);
//             } else {
//                 $('.forget-inf').css({
//                     display: 'block'
//                 });
//                 $('.forget-inf').text(data.message);
//             }
//         });
//     });

//     $('#book-upload-button').on('click', function(event){
//         var paras = {};
//         paras['bookname']=$('#bookName').val();
//         paras['author']=$('#author').val();
//         paras['publisher']=$('#publisher').val();
//         paras['publishtime']=$('#publishTime').val();
//         paras['isbn']=$('#ISBN').val();
//         paras['translator']=$('#translator').val();
//         paras['photoURL']=$('#photoUrl').val();
//         paras['authorintro']=$('#authorIntroduction').val();
//         paras['bookintro']=$('#bookIntroduction').val();

//         $.post('/api/book-upload/', paras, function (data) {
//             if (data.status) {
//                 alertFun(data.message);
//                 setTimeout(function () {
//                     $('#alertModal').modal("hide");
//                     location.reload();
//                 }, 1200);
//             } else {
//                 alertWithClose(data.message);
//             }
//         })
//     });
// });

// function OnclickLogout() {
//     // console.log("Fuck");b
//     $.post('/api/logout', function (data) {
//         var abc = "'";
//         var re = new RegExp(abc, 'g');
//         data = data.replace(re, '"');
//         //var data2 = '{"status":true,"message":"loginsuccess!"}';
//         console.log(JSON.parse(data));
//         var res = JSON.parse(data);
//         if (res.status == "true") {
//             alertFun("Logout Success!");
//             setTimeout("javascript:location.reload()", 1500);
//         } else {
//             alertFun("Logout defeat!");
//             setTimeout("javascript:location.reload()", 1500);
//         }
//     });
// }
// =======
/**
 * Created by superpig on 15/5/17.
 */
//校验登陆字段是否正确
function loginCheck() {
    // 返回的是一个validate对象，这个对象有一个form方法，返回的是是否通过验证
    return $("#loginForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            username: {
                required: "Username couldn't be null"
            },
            password: {
                required: "Password couldn't be null"
            }
        }
    });
}
//验证注册字段是否正确
function registCheck() {
    return $('#registForm').validate({
        rules: {
            schoolId: {
                required: true,
                maxlength: 10,
                minlength: 10
            },
            registUsername: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            registPassword: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            conPassword: {
                required: true,
                minlength: 6,
                maxlength: 20,
                equalTo: "#registPassword"
            }
        },
        messages: {
            schoolId: {
                required: "StudentID couldn't be null",
                maxlength: "The length of StudentID is 10",
                minlength: "The length of StudentID is 10"
            },
            registUsername: {
                required: "Nickname couldn't be null"
            },
            email: {
                required: "Email couldn't be null",
                email: "The format of email is incorrect"
            },
            registPassword: {
                required: "Password couldn't be null",
                minlength: "The minimum length of password is 6",
                maxlength: "The maximum length of password is 20"
            },
            conPassword: {
                required: "Password couldn't be null",
                minlength: "The minimum length of password is 6",
                maxlength: "The maximum length of password is 20",
                equalTo: "Please input the same password twice"
            }
        }
    });
}
function modifyPassCheck() {
    return $('#modifyForm').validate({
        rules: {
            oldPassword: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            newPassword: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            conNewPassword: {
                required: true,
                minlength: 6,
                maxlength: 20,
                equalTo: "#newPassword"
            }
        },
        messages: {
            oldPassword: {
                required: "Password couldn't be null",
                minlength: "The minimum length of password is 6",
                maxlength: "The maximum length of password is 20"
            },
            newPassword: {
                required: "Password couldn't be null",
                minlength: "The minimum length of password is 6",
                maxlength: "The maximum length of password is 20"
            },
            conNewPassword: {
                required: "Password couldn't be null",
                minlength: "The minimum length of password is 6",
                maxlength: "The maximum length of password is 20",
                equalTo: "Please input the same password twice"
            }
        }
    });
}
//保存用户名和密码
function saveUserInf() {
    if ($('#rmbUser').get(0).checked) {
        var str_username = $("#username").val();
        var str_password = $("#password").val();
        //$.cookie('name', 'value', { expires: 7 });
        $.cookie('rmbUserFlag', 'true', {expires: 7});
        $.cookie('username', str_username, {expires: 7});
        $.cookie('password', str_password, {expires: 7});
    } else {
        $.cookie('rmbUserFlag', 'false', {expires: -1});
        $.cookie('username', "", {expires: -1});
        $.cookie('password', "", {expires: -1});
    }
    console.log($.cookie('username'));
    console.log($.cookie('password'));
}

//alert function
function alertFun(msg) {
    $('#alertMsg').text(msg);
    // make the modal in the center area
    $('#alertModal').on('show.bs.modal', function () {
        console.log("alertModal");
        var $this = $(this);
        var $modalDialog = $this.find('.modal-dialog');
        var mTop = ( $(window).height() - $modalDialog.height() ) / 2;
        $modalDialog.css({'margin': mTop + 'px auto'});
    });
    $('#alertModal').modal('show');
}
//auto close alert function
function alertWithClose(msg) {
    alertFun(msg);
    setTimeout(function(){
        $('#alertModal').modal('hide');
    }, 1500);
}

$(function () {

    // 判断用户的登陆信息是否存在cookie中
    if ($.cookie('rmbUserFlag') == 'true') {
        $("#rmbUser").attr("checked", true);
        $("#username").val($.cookie("username"));
        $("#password").val($.cookie("password"));
    }
    // don't save username and password
    if (!$('#rmbUser').get(0).checked) {
      $.cookie('rmbUserFlag', 'false', {expires: -1});
      $.cookie('username', "", {expires: -1});
      $.cookie('password', "", {expires: -1});
    }
    // 点击登录按钮，开始表单验证，如果数据无误，向服务器提交数据
    $("#login").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        saveUserInf();
        if (!loginCheck().form()) return;
        var loginData = {};
        loginData['username'] = $("#username")[0].value;
        loginData['password'] = $("#password")[0].value;

        $.post('/api/login', loginData, function (data) {
            /*optional stuff to do after success */
            var abc = "'";
            var re = new RegExp(abc, 'g');
            data = data.replace(re, '"');
            //var data2 = '{"status":true,"message":"loginsuccess!"}';
            console.log(JSON.parse(data));
            var res = JSON.parse(data);

            if (res.status == "true") {
                $('#loginModal').modal("hide");
                alertFun("Login Success!")
                setTimeout("javascript:location.reload()", 1500);
            } else {
                $('.login-error').css({
                    display: 'block'
                });
                $('.login-error').text(res.message);
            }
        });
    });
    $('#loginForm').keydown(function(event) {
        console.log('keydown');
        if (event.keyCode == 13) {
            $('#login').click();
        }
    });

    // 点击注册按钮，开始表单验证，如果数据无误，向服务器提交数据
    $("#regist").on('click', function(event) {
        event.preventDefault();
        if (!registCheck().form()) return;
        var registData = {};
        //registData['schoolId'] = $("#schoolId")[0].value;
        registData['email'] = $("#email")[0].value;
        //registData['registPassword'] = $("#registPassword")[0].value;
        registData['username'] = $("#registUsername")[0].value;
        registData['password'] = $("#conPassword")[0].value;
        console.log(registData);
        $.post('/api/register/', registData, function (data) {
            console.log(data);
            if (data.status) {
                $("#registModal").modal("hide");
                alertWithClose(data['message']);
            } else {
                $('.regist-error').css({
                    display: 'block'
                });
                $('.regist-error').text(data.message);
            }
        });
    });
    $("#registForm").keydown(function(event) {
        if(event.keyCode == 13) {
            $("#regist").click();
        }
    });
    $('#modify').on('click', function () {
        if (!modifyPassCheck().form()) return;
        var modifyData = {};
        modifyData['password'] = $('#oldPassword')[0].value;
        modifyData['newpassword'] = $('#newPassword')[0].value;
        modifyData['username'] = __username;
        console.log(modifyData);
        $.post('/api/reset-password/', modifyData, function (data) {
            if (data.status) {
                $('#modifyModal').modal("hide");
                alertWithClose("Modify password successfully!");
            } else {
                $('.modify-error').css({
                    display: 'block'
                });
                $('.modify-error').text(data.message);
            }
        });
    });
    $('#forgetBtn').on('click', function (event) {
        $('#forgetBtn').attr("disabled", "disabled");
        var Data = {};
        Data['email'] = $('#email-input')[0].value;
        console.log(Data);
        $.post('/api/forget-password/', Data, function (data) {
            if (data.status) {
                alertFun("Sent success! Please check your email:)");
                setTimeout(function () {
                    $('#alertModal').modal("hide");
                    window.location.href='http://test.yuan25.com';
                }, 1200);
            } else {
                $('.forget-inf').css({
                    display: 'block'
                });
                $('.forget-inf').text(data.message);
            }
        });
    });

    $('#book-upload-button').on('click', function(event){
        var paras = {};
        console.log($('#bookName'));
        paras['bookname']=$('#fbookName')[0].value;
        paras['author']=$('#fauthor').val();
        paras['publisher']=$('#fpublisher').val();
        paras['publishtime']=$('#fpublishTime').val();
        paras['isbn']=$('#fISBN').val();
        paras['translator']=$('#ftranslator').val();
        paras['photoURL']=$('#fphotoUrl').val();
        paras['authorintro']=$('#fauthorIntroduction').val();
        paras['bookintro']=$('#fbookIntroduction').val();
        paras['classify'] = $('#fclassify').val();
        console.log(paras);
        $.post('/api/book-upload/', paras, function (data) {
            // console.log(data);
            if (data.status) {
                alertFun(data.message);
                JsBarcode($("#barcode"),data['bookID'],{format:"CODE128",displayValue:true,fontSize:20});
                setTimeout(function () {
                    $('#alertModal').modal("hide");
                    // location.reload();
                }, 1200);
            } else {
                alertWithClose(data.message);
            }
        })
    });
});

function OnclickLogout() {
    // console.log("Fuck");b
    $.post('/api/logout', function (data) {
        var abc = "'";
        var re = new RegExp(abc, 'g');
        data = data.replace(re, '"');
        //var data2 = '{"status":true,"message":"loginsuccess!"}';
        console.log(JSON.parse(data));
        var res = JSON.parse(data);
        if (res.status == "true") {
            alertFun("Logout Success!");
            setTimeout("javascript:location.href='../'", 1500);
        } else {
            alertFun("Logout defeat!");
            setTimeout("javascript:location.reload()", 1500);
        }
    });
}
// >>>>>>> origin/master

/**
 * Created by yuan on 15/5/17.
 */

$("document").ready(function () {

});

function abc() {
    var paras = {};
    paras['username'] = "123";
    paras['password'] = "123";

    $.post("/api/login", paras, function (data) {
        console.log(data);
    });
}
$(function() {
	//submit borrow form
	$('#borrowForm #borrowBtn').on('click', function(event) {
		event.preventDefault();
		var borrowData = {};
		borrowData["username"] = $('#borrowUsername')[0].value;
		borrowData["book-id"] = $("#isbn")[0].value;
		console.log(borrowData);
		$.post('/api/borrow-book/', borrowData, function(data) {
			alertWithClose(data.message);
		});
	});
	$("#borrowForm").keydown(function(event) {
		if(event.keyCode == 13) {
			$("#borrowForm #borrowBtn").click();
		}	
	});

	$('#returnForm #isbn').on('blur',  function(event) {
		event.preventDefault();
		/* Act on the event */
		console.log('blur');
		var returnData = {};
		returnData["username"] = $('#returnUsername')[0].value;
		returnData["book-id"] = $("#isbn")[0].value;
		console.log(returnData);
		$.post('/api/single-fine/', returnData, function(data) {
			/*optional stuff to do after success */
				console.log(data);
				if (data == -1) {
					alertWithClose('please input data');
				} 
				if (data >= 0.0) {
					var $confirm = confirm('Need to pay ' + data + '$');
					if ($confirm) {
						console.log('true');
						$('#returnForm #returnBtn').css({
							display: 'inline'
						});
					} 
				}
		});
	});
	//submit return form 
	$('#returnForm #returnBtn').on('click',  function(event) {
		event.preventDefault();
		/* Act on the event */
		var returnData = {};
		returnData["username"] = $('#returnUsername')[0].value;
		returnData["book-id"] = $("#isbn")[0].value;
		console.log(returnData);
		$.post('/api/return-book/', returnData, function(data) {
			console.log(data);
			alertWithClose(data.message);
		});
	});
	$("#returnForm").keydown(function(event) {
		if(event.keyCode == 13) {
			$("#returnForm #returnBtn").click();
		}	
	});
});
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