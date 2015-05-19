//校验登陆字段是否正确
function loginCheck(){
  // 返回的是一个validate对象，这个对象有一个form方法，返回的是是否通过验证
  return $("#loginForm").validate({
    rules:{
      username:{
        required:true
      },
      password:{
        required:true
      }
    },
    messages:{
      username:{
        required:"Username couldn't be null"
      },
      password:{
        required:"Password couldn't be null"
      }
    }
  });
}
//验证注册字段是否正确
function registCheck() {
  return $('#registForm').validate({
    rules: {
      schoolId:{
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
      schoolId:{
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
//保存用户名和密码
function saveUserInf () {
  if ($('#rmbUser').get(0).checked) {
    var str_username = $("#username").val();
    var str_password = $("#password").val();
    //$.cookie('name', 'value', { expires: 7 });
    $.cookie('rmbUserFlag', 'true', { expires: 7});
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
$(function(){

  // 判断用户的登陆信息是否存在cookie中
  if ($.cookie('rmbUserFlag') == "true") {
    $("#rmbUser").attr("checked", true);
    $("#username").val($.cookie("username"));
    $("#password").val($.cookie("password"));
  }

  // 点击登录按钮，开始表单验证，如果数据无误，向服务器提交数据
  $("#login").click(function(){
    // console.log($('#rmbUser').get(0).checked);
    if($('#rmbUser').get(0).checked == true) {
      saveUserInf();
    }
    if(!loginCheck().form()) return;
    var loginData = {};
    loginData['username'] = $("#username")[0].value;
    loginData['password'] = $("#password")[0].value;

     $.post('http://192.168.31.110/api/login', loginData, function(data) {
       /*optional stuff to do after success */
       var abc = "'";
       var re = new RegExp(abc, 'g');
       data = data.replace(re, '"');
       //var data2 = '{"status":true,"message":"loginsuccess!"}';
       console.log(JSON.parse(data));
       var res = JSON.parse(data);

       if(res.status == "true"){
         setTimeout("javascript:location.reload()",700);
       }else{
         $('.login-error').css({
           display: 'block'
         });
       }
     });
  });

  // 点击注册按钮，开始表单验证，如果数据无误，向服务器提交数据
  $("#regist").click(function(){
    if(!registCheck().form()) return;
    var registData = {};
    //registData['schoolId'] = $("#schoolId")[0].value;
    //registData['email'] = $("#email")[0].value;
    //registData['registPassword'] = $("#registPassword")[0].value;
    registData['username'] = $("#registUsername")[0].value;
    registData['password'] = $("#conPassword")[0].value;
    console.log(registData);

    $.post('/api/register/', registData, function(data){
       console.log(data);
        if(data.status){
          alert("Register success!");
          $("#registModal").modal("hide");
        }else{
          $('.regist-error').css({
            display: 'block'
          });
        }
    });

  });
});

function OnclickLogout(){

  $.post('/api/logout',function(data){
    var abc = "'";
    var re = new RegExp(abc, 'g');
    data = data.replace(re, '"');
    //var data2 = '{"status":true,"message":"loginsuccess!"}';
    console.log(JSON.parse(data));
    var res = JSON.parse(data);

    if(res.status == "true"){
      alert("Logout success!");
      setTimeout("javascript:location.reload()",700);
    }else{

    }
  });
}
