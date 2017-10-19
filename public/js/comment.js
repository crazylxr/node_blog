var prepage = 5;
var page = 1;
var pages = 0;
var comments = [];

$.ajax({
    type: 'get',
    url: '/api/comment',
    data: {
        contentid:$('#contentId').val()
    },
    success: function (responseData) {
        comments = responseData.data;
        renderComment();
    }
})

$('#messageBtn').on('click', function () {
    var $nickname = $('#nickname');
    var $email = $('#email');
    var $site = $('#site');
    var $messageContent = $('#messageContent');

    $.ajax({
        type: 'post',
        url: '/api/comment/post',
        data: {
            contentid:$('#contentId').val(),
            content: $messageContent.val(),
            nickname: $nickname.val(),
            email: $email.val(),
            site: $site.val()
        },
        success: function (responseData) {
            $('#messageContent').val('');
            comments = responseData.data.comments;
            renderComment();
        }
    })
})

function renderComment() {
    $('#messageCount').html(comments.length);

    var pages = Math.max(Math.ceil(comments.length / prepage), 1);
    var start = Math.max(0,(page-1) * prepage);
    var end = Math.min(start + prepage,comments.length );
    var $lis = $('.pager li');
    $lis.eq(1).html(page + '/' + pages)

    if(page <= 1){
        page = 1;
        $lis.eq(0).html("<span>没有上一页</span>");
    }else {
        $lis.eq(0).html("<a href=''>上一页</a>");
    }

    if(page >= pages){
        page = pages;
        $lis.eq(2).html("<span>没有下一页</span>");
    }else {
        $lis.eq(2).html("<a href=''>下一页</a>");
    }
    if (comments.length == 0){
        $('.messageList').html('<div class="messageBox"><p>还没有评论</p></div>');
    }else {
        var html = '';
        
        for(var i = end - 1  ; i >= start; i--){
            html += ` <div class="messageBox">
                        <div class="messageBox__avator"><img src="/public/imgage/avatar.png" alt="atatar"></div>
                        <div class="messageBox__text">
                            <div class="messageBox__meta">
                                <p class="name clear"><span class="fl" style='margin-right:5px;'>${comments[i].nickname}</span><span class="fr">${formateDate(comments[i].postTime)}</span></p>
                            </div>
                            <div class="messageBox__content"><p>${comments[i].content}</p></div>
                        </div>
                    </div>`;
        }

        $('.messageList').html(html);
    }

}

$('.pager').delegate('a', 'click', function (e) {
    e.preventDefault();
    if ($(this).parent().hasClass('previous')){
        page--;
    }else {
        page++;
    }
    renderComment();

})
 
function formateDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear()+'-' + (date1.getMonth()+1) + '-'+date1.getDate()+" "+date1.getHours()+":"+date1.getMinutes()+":"+date1.getSeconds();
}