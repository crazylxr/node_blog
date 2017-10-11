$(function () {

    var $labels = $('#labels');
    var $tags = $('#tags');
    
    //选择标签
    $labels.on("click", function (e) {
        var tagsString = $tags.val();
        
        $tags.val(getNewTags(tagsString).join(','));

        function getNewTags(tagsString){
            var tags = [];
            var tagIndex = 0;

            if(tagsString){
                tags = $tags.val().split(',');
            }

            tagIndex = tags.indexOf(e.target.text);

            if (tagIndex === -1){
                tags.push(e.target.text); 
            }else{ 
                tags.splice(tagIndex, 1);
            }

            return tags;
        }
    });

    // var $loginBox = $('#loginBox');
    // var $registerBox = $('#registerBox');
    // var $userInfo = $('#userInfo');
    // var $logout = $('#logout');

    // $loginBox.find('a.colMint').on('click',function () {
    //     console.log(1);
    //     $loginBox.hide();
    //     console.log(2);
    //     $registerBox.show();
    // });

    // $registerBox.find('a.colMint').on('click',function () {
    //     $loginBox.show();
    //     $registerBox.hide();
    // });

    //退出
    // $logout.on('click', function () {
    //     $.ajax({
    //         url: '/api/user/logout',
    //         success: function (result) {
    //             if(!result.code){
    //                 window.location.reload();
    //             }
    //         }
    //     });
    // })

    //注册
    // $registerBox.find('button').on('click',function () {
    //     $.ajax({
    //         type: 'post',
    //         url: '/api/user/register',
    //         data: {
    //             username: $registerBox.find('[name="username"]').val(),
    //             password: $registerBox.find('[name="password"]').val(),
    //             repassword: $registerBox.find('[name="repassword"]').val()
    //         },
    //         dataType: 'json',
    //         success: function (result) {
    //             console.log(result);
    //             $registerBox.find('.colWarning').html(result.message);

    //             if(!result.code){
    //                 //注册成功
    //                 setTimeout(function () {
    //                     $loginBox.show();
    //                     $registerBox.hide();
    //                 },1000);
    //             }
    //         }
    //     });
    // })
})
