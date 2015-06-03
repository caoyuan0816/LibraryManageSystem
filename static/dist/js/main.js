//get param from url
function getUrlParam(name){  
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
    var r = window.location.search.substr(1).match(reg);  
    if (r!=null) return unescape(r[2]);  
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
// book search page script
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]);
	return null;
}

// book search ajax
function bookSearchAjax(paras) {
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
$(function () {

    // 判断用户的登陆信息是否存在cookie中
    if ($.cookie('rmbUserFlag') == "true") {
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
    $("#login").click(function () {
        // console.log($('#rmbUser').get(0).checked);
        // if ($('#rmbUser').get(0).checked == true) {
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
                setTimeout("javascript:location.reload()", 1200);
            } else {
                $('.login-error').css({
                    display: 'block'
                });
                $('.login-error').text(res.message);
            }
        });
    });

    // 点击注册按钮，开始表单验证，如果数据无误，向服务器提交数据
    $("#regist").click(function () {
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
                alertFun("Regist Success!");
                setTimeout(function () {
                    $('#alertModal').modal("hide");
                }, 1200);
                // setTimeout("javascript:location.reload()", 1000);
            } else {
                $('.regist-error').css({
                    display: 'block'
                });
                $('.regist-error').text(data.message);
            }
        });
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
                alertFun("Modify  Password Successfully!");
                setTimeout(function () {
                    $('#alertModal').modal("hide");
                }, 1200);
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
        paras['bookname']=$('#bookName').val();
        paras['author']=$('#author').val();
        paras['publisher']=$('#publisher').val();
        paras['publishtime']=$('#publishTime').val();
        paras['isbn']=$('#ISBN').val();
        paras['currentstorage']=$('#currentStorage').val();
        paras['translator']=$('#translator').val();
        paras['photoURL']=$('#photoUrl').val();
        paras['authorintro']=$('#authorIntroduction').val();
        paras['bookintro']=$('#bookIntroduction').val();

        $.post('/api/book-upload/', paras, function (data) {
            if (data.status) {
                alertFun(data.message);
                setTimeout(function () {
                    $('#alertModal').modal("hide");
                    location.reload();
                }, 1200);

            } else {
                alertFun(data.message);
                setTimeout(function () {
                    $('#alertModal').modal("hide");
                }, 1200);
            }
        })
    });
});

function OnclickLogout() {

    $.post('/api/logout', function (data) {
        var abc = "'";
        var re = new RegExp(abc, 'g');
        data = data.replace(re, '"');
        //var data2 = '{"status":true,"message":"loginsuccess!"}';
        console.log(JSON.parse(data));
        var res = JSON.parse(data);

        if (res.status == "true") {
            alertFun("Logout Success!");
            setTimeout("javascript:location.reload()", 1200);
        } else {

        }
    });
}

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