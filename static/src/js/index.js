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
                alertWithClose("Regist Success!");
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
