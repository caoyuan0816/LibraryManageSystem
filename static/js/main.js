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