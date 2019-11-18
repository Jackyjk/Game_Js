var canvas = document.getElementById("main");       //获取画布  
var context = canvas.getContext("2d");          

//浏览器高度和宽度
var WindowX = window.innerWidth;
var WindowY = window.innerHeight;

canvas.width  = WindowX;
canvas.height  = WindowY;

//下落字体大小
var fontSize = 16;

var colunm = Math.floor(WindowX/fontSize);          //计算列,向下取整
var drops = [];

for(var i = 0; i < colunm;i ++){
    drops[i] = 1;       //确定初始位置   试用随机位置
    // drops[i] = Math.floor(Math.random()*5);          //不太好看，不建议用   滑稽.jpg
}

var str = "Javascript Test zhixiangzuoyigedemotu";       //定义运动文字

function draw(){
    context.fillStyle = "rgb(0,0,0,0.05)";         //填充背景
    context.fillRect(0,0,WindowX,WindowY);     //绘制矩形
    context.font = "700 " + fontSize + "px 微软雅黑";    //注意700之后的空格，没空格直接加数字。string+int 直接5位数int  因为这块卡了20分钟
    context.fillStyle = randomColor();          //画笔  随机色
    // context.fillStyle = "#00cc33";           // 画笔 绿色
    for(var i = 0; i < colunm;i ++){
        var index = Math.floor( Math.random()*str.length);  //随机出现字符

        var x = i * fontSize;
        var y = drops[i] * fontSize;
        context.fillText(str[index],x,y);

        if(y >= canvas.height && Math.random() >0.99){
            drops[i] = 0;
        }

        drops[i] ++;

    }
};

function randomColor(){
    var color1 = Math.floor(Math.random() * 256);
    var color2 = Math.floor(Math.random() * 256);
    var color3 = Math.floor(Math.random() * 256);

    return "rgb(" + color1 + "," + color2 + "," + color3 + ")";
}

draw();

setInterval(draw,20);           //参数：函数名，时间