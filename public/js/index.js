$(function () {

    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('#userInfo');
    var $logout = $('#logout');

    $loginBox.find('a.colMint').on('click',function () {
        console.log(1);
        $loginBox.hide();
        console.log(2);
        $registerBox.show();
    });

    $registerBox.find('a.colMint').on('click',function () {
        $loginBox.show();
        $registerBox.hide();
    });

    //退出
    $logout.on('click', function () {
        $.ajax({
            url: '/api/user/logout',
            success: function (result) {
                if(!result.code){
                    window.location.reload();
                }
            }
        });
    })

    //注册
    $registerBox.find('button').on('click',function () {
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $registerBox.find('[name="username"]').val(),
                password: $registerBox.find('[name="password"]').val(),
                repassword: $registerBox.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $registerBox.find('.colWarning').html(result.message);

                if(!result.code){
                    //注册成功
                    setTimeout(function () {
                        $loginBox.show();
                        $registerBox.hide();
                    },1000);
                }
            }
        });
    })

    //登录
    $loginBox.find('button').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $loginBox.find('[name="username"]').val(),
                password: $loginBox.find('[name="password"]').val(),
            },
            dataType:'json',
            success:function (result) {
                if(!result.code){
                    // setTimeout(function () {
                    //     $loginBox.hide();
                    //     console.log($userInfo);
                    //     $userInfo.show();
                    //
                    //     $userInfo.find('.username').html(result.userInfo.username);
                    //     $userInfo.find('.info').html("你好，欢迎来我的博客");
                    // },1000)
                    window.location.reload();
                }

                $loginBox.find('.colWarning').html(result.message);
            }
        });
    })

    var content = $('#post-content').html();
    // debugger
     console.log(content);
       marked.setOptions({
          highlight: function (code) {
            return hljs.highlightAuto(code).value;
          }
        });

    var convert = marked(content.replace(/&gt;/g,'>'));
    console.log(convert);
    $('#post-content').html(convert);
})