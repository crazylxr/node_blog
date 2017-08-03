var prepage = 2;
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
    $.ajax({
        type: 'post',
        url: '/api/comment/post',
        data: {
            contentid:$('#contentId').val(),
            content: $('#messageContent').val(),
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

        for(var i = end  ; i > start; i--){
            html += `<div class="messageBox">
                     <p class="name clear"><span class="fl">${comments[i].username}</span><span class="fr">${formateDate(comments[i].postTime)}</span></p>
                      <p>${comments[i].content}</p>
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