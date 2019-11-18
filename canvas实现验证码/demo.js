var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function init() {
    for (var i = 65; i < 122; i++) {
        if (i > 90 && i < 97) {
            continue;
        }
        // 利用ASCII码将数字转成大小写英文字母
        arr.push(String.fromCharCode(i));
        // arr作为随机挑选数字的数组
    }
   
    createCanvas();
    bindevent();
}
init();
var canvasStr, valueRight;
// 随机挑选文字内容
function createCanvas() {
    var len = arr.length;
    canvasStr = '';
    valueRight = '';
    for (var i = 0; i < 6; i++) {
        var text = arr[Math.floor(Math.random() * len)];
        canvasStr += text + ' ';
        valueRight += text;
    }
    // 获得canvas区域
    var myCanvas = $('#myCanvas')[0];
    var ctx = myCanvas.getContext('2d');
    // 画线
    ctx.beginPath();
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#ccc';
    ctx.moveTo(Math.floor(Math.random()*50),Math.floor(Math.random()*80));
    ctx.lineTo(250 + Math.floor(Math.random()*30),Math.floor(Math.random()*80));
    ctx.stroke();
    ctx.globalCompositeOperation="lighter";
    ctx.closePath();
   
    // 将文字写入canvas画布中
    ctx.save();
    ctx.beginPath();
    var x = myCanvas.width / 2;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ddd';
    ctx.font = '46px Roboto Slab';
    ctx.setTransform(1, -0.12, 0.2, 1, 0, 12);
    ctx.fillText(canvasStr, x, 60);
    ctx.restore();
}

function bindevent() {
    // 提交按钮
    $('.submit').on('click', function () {
        var value = $('.inp').val().trim();
        // 提交内容为空
        if (value == '' || value == null || value == undefined) {
            $('.errorText').show().html('请输入内容');
            $('.icon').css({ display: 'inline-block', backgroundImage: 'url("./images/false.png")' });
        } else {
            // 提交内容正确
            if (value == valueRight) {
                $('.icon').css({ display: 'inline-block', backgroundImage: 'url("./images/true.png")' });
                createCanvas();
                // 提交内容错误
            } else {
                $('.errorText').show().html('验证码错误，请重新输入');
                $('.icon').css({ display: 'inline-block', backgroundImage: 'url("./images/false.png")' });
            
            }
        }
    });
    // 更新按钮
    $('.refresh').on('click', function () {
        createCanvas();
        $('.errorText').add($('.icon')).fadeOut(100);

    });
    // 重新聚焦使错误提示消失
    $('.inp').focus(function () {
        $('.errorText').add($('.icon')).fadeOut(100);
    })
}