var chessBoard  = []; 
var me = true;
var over = false;
//赢法数组
var wins = [];

//赢法统计数组
var myWin = [];
var computerWin = [];

for(var i=0;i<15;i++){
	chessBoard[i] = [];
	for(var j=0;j<15;j++){
		chessBoard[i][j] = 0;
	}
}
for(var i=0;i<15;i++){
	wins[i] = [];
	for(var j=0;j<15;j++){
		wins[i][j] = [];
	}
}

var count = 0;
//所有的横线赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		//wins[0][0][0] = true
		//wins[0][1][0] = true
		//wins[0][2][0] = true
		//wins[0][3][0] = true
		//wins[0][4][0] = true
		
		//wins[0][1][1] = true
		//wins[0][2][1] = true
		//wins[0][3][1] = true
		//wins[0][4][1] = true
		//wins[0][5][1] = true
		for(var k=0;k<5;k++){
			wins[i][j+k][count] = true;
		}
		count++;	
	}
}

//所有的竖线赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count] = true;
		}
		count++;	
	}
}
//所有的斜线赢法
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count] = true;
		}
		count++;	
	}
}
//所有的反斜线赢法
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count] = true;
		}
		count++;	
	}
}

for(var i=0;i<count;i++){
	myWin[i] =0;
	computerWin[i] =0;
}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#BFBFBF";

var logo = new Image();
logo.src = "img/hhh.jpg";
logo.onload = function()
{
	context.drawImage(logo,0,0,650,650);
	drawChessBoard();
	
}
var drawChessBoard = function()
{
	for(var i=0;i<15;i++)
	{
	context.moveTo(15+i*30,15);
	context.lineTo(15+i*30,435);
	context.stroke();
	context.moveTo(15,15+i*30);
	context.lineTo(435,15+i*30);
	context.stroke();
	}
}

var oneStep = function(i,j,me)
{
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0)
	if(me){
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}

	context.fillStyle = gradient;
	context.fill();
}
chess.onclick = function(e)
{
	if(over){
		return;
	}
	if(!me){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i =Math.floor(x/30);
	var j =Math.floor(y/30);
	if(chessBoard[i][j] == 0){
		oneStep(i,j,me);
		chessBoard[i][j] = 1;
	
		for(var k=0;k<count;k++){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k] =6;
				if(myWin[k]  == 5){
					window.alert("You win!");
					over = true;
				}
			}
		}
		if(!over){
			me = !me;
			computerAI();
		}
	}
}	

//计算机下旗
var computerAI = function(){
    //记录人下的旗子
    var myScore = [];
    //记录计算机下的旗子
    var computerScore = [];
    //保存最高分数
    var max = 0;
    //最高分数点坐标
    var maxX = 0,maxY = 0;
 
    for(var i=0; i<15; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j=0; j<15; j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
 
    //遍历整个棋盘
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            //该坐标可以落子
            if(chessBoard[i][j] == 0){
                //遍历所有赢法
                for(var k=0; k<count; k++){
                    //判断第K种赢法是否有价值
                    if(wins[i][j][k]){
                        //判断第K种赢发黑旗是否落子
                        //拦截价值判断
                        if(myWin[k] == 1){
                            //拦截
                            myScore[i][j] += 200;
                        }else if(myWin[k] == 2){
                            //拦截
                            myScore[i][j] += 400;                        
                        }else if(myWin[k] == 3){
                            //拦截
                            myScore[i][j] += 2000;                           
                        }else if(myWin[k] == 4){
                            //拦截
                            myScore[i][j] += 10000;                          
                        }
 
                        //计算机本身落子价值判断
                        if(computerWin[k] == 1){
                            //落子价值
                            computerScore[i][j] += 220;
                        }else if(computerWin[k] == 2){
                            //落子价值
                            computerScore[i][j] += 420;                          
                        }else if(computerWin[k] == 3){
                            //落子价值 
                            computerScore[i][j] += 2100;                         
                        }else if(computerWin[k] == 4){
                            //落子价值
                            computerScore[i][j] += 20000;                    
                        }
                    }
                }
 
                //存储最高分数
                if(myScore[i][j] > max){
                    max = myScore[i][j];
                    maxX = i;
                    maxY = j;
                }else if(myScore[i][j] == max){
                    if(computerScore[i][j] > computerScore[maxX][maxY]){
                        maxX = i;
                        maxY = j;
                    }
                }
 
                //存储最高分数
                if(computerScore[i][j] > max){
                    max = computerScore[i][j];
                    maxX = i;
                    maxY = j;
                }else if(computerScore[i][j] == max){
                    if(myScore[i][j] > myScore[maxX][maxY]){
                        maxX = i;
                        maxY = j;
                    }
                }
 
            }
        }
    }
    //计算机子
    oneStep(maxX, maxY, false);
    chessBoard[maxX][maxY] = 2;
    document.title = 'x'+maxX+' Y'+maxY;
    //console.dir(chessBoard[maxX][maxY]);
    //赢法统计
    for(var k=0; k<count; k++){
        if(wins[maxX][maxY][k]){
            //白子赢法更近一步
            computerWin[k]++;
            //该赢法黑旗不可能再赢了
            myWin[k] = 6;
            //
            if(computerWin[k] == 5){
                window.alert("Computer win!");
                over = true;
            }
        }
    }
 
    //如果赢法统计完成棋没有结束
    if(!over){
        me = !me;
    }
}