$(function(){
    var $username = $('#username');
    var $password = $('#password');
    var $login = $('#login');

    //登录
    $login.on('click', function(e){
        e.preventDefault();
        
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $username.val(),
                password: $password.val(),
            },
            dataType:'json',
            success:function (result) {

                alert(result.message);

                if(!result.code){
                    window.location = "/admin";
                }
            }
        });
    })
    
})