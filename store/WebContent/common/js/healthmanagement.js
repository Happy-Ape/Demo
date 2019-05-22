$(function(){
	
		
	$("#addbtn").click(function(){
		layui.use('layer', addopen);
	});
		
var addopen=function (){
  	 layer.open({
                title: '添加栏目',
                type: 1,
                content: document.getElementById('code-temp').innerHTML,
                btn: ['确定'],
                yes: function (index, layero) {
                    var $namement = $('#namement');
                    var $txtmore = $('#txtmore');
                    if ($namement.val() === '') {
                        layer.msg('栏目名称为必填项');
                        isCheck = false;
                    } else {
                        layer.msg('可以提交');
                        layer.close(index);
                    }
                },
                area: ['500px', '260px']
            });
}		
		
})
