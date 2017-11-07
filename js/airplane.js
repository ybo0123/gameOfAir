/**
 * Created by Administrator on 2017/11/2 0002.
 */
window.onload = function () {

    var rain = (function () {
        var _rain = function () {
            this.init();
        }
        _rain.prototype = (function () {
            var speed = 0;
            var obj = [];
            var n = 0;
            var m = {x: 0, y: 0};
            var flagForRain = 0;
            var boom = [];
            var flag = 0; //键盘事件unicode码值
            var boomZD = []; //存放子弹
            var feiXY = [{x: 0, y: 0}]; //飞机坐标
            var key = [];//存储按键信息
            var zdBIUBIU = null;
            var zdCount = 0;
            var bmCount = 0;
            var bigBmCount = 0;
            var flagForBigBoom = 0; //敌方大导弹产生标识
            var flagForBoom = 0;//敌方小导弹产生标识
            var bigBoom = []; //存放大导弹
            var endTime; //当前时间（用于小导弹产生）
            var timeC; //时间差（用于小导弹产生）
            var timerBom;
            var timer;
            var $ = function (id) {
                return document.getElementById(id);
            };
            var $C = function (cls) {
                return document.getElementsByClassName(cls)[0];
            }
            var fei = $('feiji');
            debugger
            fei.style.background = checkCookie()+' no-repeat';
            fei.style.backgroundSize = '54px 45px';
            // var gameSet = new gameSeting();
            // fei.style.background = gameSet.arrayForAirPlane;
            var screen = $('screen');
            var height = $('screen').clientHeight;//父元素的宽高
            var width = $('screen').clientWidth;
            var gameover = $('gameover'); //游戏结束弹出框
            var goOn = $('goOn');//继续游戏
            var over = $('over');//结束

            var rainFlag = new createRain();
            rainFlag.css.display = 'none';
            var bigBoomFlag = new createBigBoom();
            bigBoomFlag.css.display = 'none';

            var rainWidth = 20;//小导弹的宽高
            var rainHeight = 35;
            var bigBoomW = bigBoomFlag.elem.clientWidth;
            var bigBoomH = bigBoomFlag.elem.clientWidth;



            /**
             * 小导弹工厂
             */
            function createRain() {
                var elem = document.createElement('span');
                this.elem = elem;
                this.css = elem.style;
                this.css.position = 'absolute';
                this.elem.className = 'boom';
                this.elem.id = 'cIdCR' + (bmCount++);
                this.speedY = 0;
                this.speedX = 0;
                screen.appendChild(elem);
            }

            /**
             * 大导弹工厂
             */
            function createBigBoom() {
                var elem = document.createElement('span');
                this.css = elem.style;
                this.elem = elem;
                elem.className = 'bigBoom';
                this.elem.id = 'cIdBB' + (bigBmCount++);
                this.speedY = 0;
//                this.speedX = 0;
                this.t = 0;
                this.speed = 80;
                this.flagCount = 0;//子弹碰触标识，超过三次则清除
                var random = Math.round(Math.random() * 1);
                var randomLeft = Math.round(Math.random() * (width - elem.clientWidth));
                this.css.left = randomLeft + 'px';
                if (random === 0) {
                    this.speedX = -3;
                } else {
                    this.speedX = 3;
                }
                screen.appendChild(elem);
            }

            /**
             *定义子弹方法
             */
            var createYH = function () {
                var elem = document.createElement('span');
                this.css = elem.style;
                this.css.position = 'absolute';
                elem.className = 'createYH';
                elem.style.background = getCookie('imgUrlB')+' no-repeat';
                elem.style.backgroundSize = '100% 100%';
                this.elem = elem;
                this.elem.id = 'cIdYH' + (zdCount++);
                this.elem = elem;
                this.speedY = 5;
                this.speedX = 5;
                screen.appendChild(elem);
            }



            var createRadio = function () {
                var elem = document.createElement('audio');
                elem.src = 'radio/4013.wav';
                this.elem = elem;
                elem.autoplay = 'true';
                screen.appendChild(elem);
            }

            var createZDRadio = function () {
                var elem = document.createElement('audio');
                elem.src = 'radio/6692.wav';
                this.elem = elem;
                elem.autoplay = 'true';
                elem.loop = 'true';
                screen.appendChild(elem);
            }

            /**
             *创建子弹消灭敌方
             */
            var Boom = function () {
                var elem1 = new createYH();
                boomZD.push(elem1);
                var elem2 = new createYH();
                boomZD.push(elem2);
                elem1.css.left = (feiXY[0].x - 18) + 'px';
                elem2.css.left = (feiXY[0].x + 9) + 'px';
                elem1.css.top = feiXY[0].y + 'px';
                elem2.css.top = feiXY[0].y + 'px';
            }

            /**
             *子弹与导弹的碰撞
             */
            createYH.prototype.boomFlash = function (j) {
                var top = this.elem.offsetTop - this.speedY
                var x = this.elem.offsetLeft + this.elem.clientWidth / 2;
                var y = this.elem.offsetTop + this.elem.clientHeight / 2;

                for (var index in obj) {
                    var x1 = obj[index].elem.offsetLeft + rainWidth / 2;
                    var y1 = obj[index].elem.offsetTop + rainHeight / 2;
                    if (Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2)) <= 15) {

                        if ($(this.elem.id)) {
                            screen.removeChild(this.elem);
                        }
                        if ($(obj[index].elem.id)) {
                            screen.removeChild(obj[index].elem);
                        }
                        if (boomZD.indexOf(this) > -1) {
                            boomZD.splice(j, 1);
                        }
                        if (obj.indexOf(obj[index]) > -1) {
                            obj.splice(index, 1);
                        }
                    }
                }
                //子弹越界移除
                if (top <= 10 && boomZD.indexOf(this) != -1) {
                    screen.removeChild(this.elem);
                    boomZD.splice(j, 1);
                }
                this.css.top = top + 'px';
            }
            /**
             * 小导弹移动函数
             * @param speed1
             */
            createRain.prototype.move = function (speed1) {
                this.css.top = (this.speedY += speed1) + 'px';
                if (parseInt(this.css.top) >= height + 20) {
                    var left = this.elem.offsetLeft;
                    if ($(this.elem.id)) {
                        screen.removeChild(this.elem);
                    }
                    var index = obj.indexOf(this);
                    obj.splice(index, 1);
                }
            }
            /**
             * 大导弹与子弹碰触事件
             * @param j
             */
            createYH.prototype.bigBoomFlash = function (j) {
                var top = this.elem.offsetTop - this.speedY
                var x = this.elem.offsetLeft + this.elem.clientWidth / 2;
                var y = this.elem.offsetTop + this.elem.clientHeight / 2;

                for (var index in bigBoom) {
                    var x1 = bigBoom[index].elem.offsetLeft + bigBoomW / 2;
                    var y1 = bigBoom[index].elem.offsetTop + bigBoomH / 2;
                    if (Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2)) <= 15) {
                        bigBoom[index].flagCount++;
                        if ($(this.elem.id)) {
                            screen.removeChild(this.elem);
                        }
                        if (boomZD.indexOf(this) > -1) {
                            boomZD.splice(j, 1);
                        }
                        if (bigBoom[index].flagCount >= 3) {
                            if ($(bigBoom[index].elem.id)) {
                                screen.removeChild(bigBoom[index].elem);
                            }
                            if (bigBoom.indexOf(bigBoom[index]) > -1) {
                                bigBoom.splice(index, 1);
                            }
                        }
                    }
                }
                this.css.top = top + 'px';
            }
            var clearBoom = function () {
                var now;
                var jg;
                setTimeout(function () {
                    for (var i = 0, len = boom.length; i < len; i++) {
                        now = new Date();
                        jg = now.getTime() - boom[i].startTime.getTime();
                        if (jg >= 3000) {
                            $('screen').removedNodes(boom[i]);
                            boom.splice(i, 1);
                        }
                    }
                }, 3000);
            }
            /**
             * @param count
             * @param left
             */
            var flagRain = function (count, left) {
                var dotCount = Math.round(Math.random() * count);
                for (var i = 0; i < dotCount; i++) {
                    left = Math.random() * left;
                    var elem = new createRain();
                    elem.css.left = left + 'px';
                    obj.push(elem);
                }
            }

            //开始敌方导弹
            var start = function (startTime, count) {
                if (obj.length < 10) {
                    endTime = new Date();
                    timeC = endTime.getTime() - startTime.getTime();
                    if (parseInt(timeC / 1000) > 60) {
                        count = 6;
                    } else if (parseInt(timeC / 1000) > 30) {
                        count = 4;
                    } else if (parseInt(timeC / 1000) > 10) {
                        count = 2;
                    }
                    flagRain(count, parseInt(screen.clientWidth));
                } else {
                    return;
                }
            }

            //游戏结束爆炸
            var gameoverBoom = function (left, top) {
                var elem = document.createElement('div');
                var img = document.createElement('img');
                elem.appendChild(img);
                elem.style.height = '200px';
                elem.style.width = '200px';
                elem.style.position = 'absolute';
                elem.style.left = left - 80 + 'px';
                elem.style.top = top - 80 + 'px';
                img.style.height = '200px';
                img.style.width = '200px';
                img.src = 'img/bom.gif';
                elem.style.zIndex = '100';
                screen.appendChild(elem);
            }

            //判断是否撞击爆炸
            var flagZJ = true;
            var flagBigBoom = true;
            var distanceOfFei = function (x1, y1, feiX, feiY, speed1) {

                /**
                 * 小导弹与飞机碰撞事件
                 */
                for (var index in obj) {
                    if (obj[index]) {
                        obj[index].move(speed1);
                    }
                    if (obj.indexOf(obj[index]) != -1) {
                        var x = obj[index].elem.offsetLeft + rainWidth / 2;
                        var y = obj[index].elem.offsetTop + rainHeight / 2;
                    }
                    if (Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2)) <= 15) {
                        if (flagZJ) { //判断是否触碰爆炸，触碰则不进行第二次
                            // screen.removeChild(fei)
                            fei.style.display = 'none';
                            // if (zdBIUBIU != null) {
                            //     screen.removeChild(zdBIUBIU.elem);
                            // }
                            var boom = new gameoverBoom(feiX, feiY);
                            var audie = new createRadio();
                            flagZJ = false;
                        }
                    }
                }

                /**
                 * 大导弹和飞机碰撞事件
                 */
                for (var indexBig in bigBoom) {
                    if (bigBoom.indexOf(bigBoom[indexBig]) != -1) {
                        var bigX = bigBoom[indexBig].elem.offsetLeft + bigBoom[indexBig].elem.clientWidth / 2;
                        var bigY = bigBoom[indexBig].elem.offsetTop + bigBoom[indexBig].elem.clientHeight / 2;
                    }
                    if (Math.sqrt(Math.pow(bigX - x1, 2) + Math.pow(bigY - y1, 2)) <= 25) {
                        if (flagBigBoom) {
                            // screen.removeChild(fei);
                            fei.style.display = 'none';
                            screen.removeChild(bigBoom[indexBig].elem);
                            bigBoom.splice(indexBig, 1);
                            // if (zdBIUBIU != null) { //移除子弹声音
                            //     screen.removeChild(zdBIUBIU.elem);
                            // }
                            var boom = new gameoverBoom(feiX, feiY);
                            var audie = new createRadio();
                            flagBigBoom = false;
                        }
                    }
                }
                if (!flagZJ || !flagBigBoom) {
                    // gameover.className = 'gameover';
                    clearInterval(timerBom);
                    clearInterval(timer);
                    setTimeout(function () {
                        var child = $('screen').children;
                        boom = [];
                        /**
                         * 该处注意由于没删减一次元素child长度减一，因此当i的值增到与要删减的元素的下标
                         * 相等时，元素无法再进行删减，因此每次i增1后，又要再减回来
                         */
                        for (var i = 0; i < child.length; i++) {
                            // if (child[i] != gameover) {
                            if (child.length > 4) {
                                $('screen').removeChild(child[4]);
                                i--;
                            }
                            // }
                        }
                        gameover.className = 'gameover';
                        var zd = new createYH();
                        zd.css.top = '100px';
                        zd.css.left = '10px';
                    }, 1500);
                }
            }

            /**
             * 是否继续游戏
             * @param i
             */
            function forGameOver() {
                goOn.onclick = function () {
                    location.reload();
                }
                over.onclick = function () {
                    location.href = "index.html";
                }
            }

            //移动炸弹工厂
            var boomMove = function (i) {
                this.speedY += 4.5
                this.css.top = this.speedY + 'px';
                if (this.elem.offsetLeft + this.elem.clientWidth >= width) {
                    this.speedX = -1 * this.speedX;
                } else if (this.elem.offsetLeft <= 0) {
                    this.speedX = -1 * this.speedX;
                }
                this.css.left = this.elem.offsetLeft + this.speedX + 'px';
                if (this.elem.offsetTop > height) {
                    screen.removeChild(this.elem);
                    if (bigBoom.indexOf(this) > -1) {
                        bigBoom.splice(i, 1);
                    }
                }
            }

            //产生大导弹
            var boomCreateElem = function () {
                var elem = new createBigBoom();
                bigBoom.push(elem);
            }

            //呼叫子弹移动事件
            var boomMoveStart = function () {
                for (var i = 0; i < bigBoom.length; i++) {
                    boomMove.call(bigBoom[i], i);
                }
            }

            //空格事件暂停
            // var pauseStop =

            //飞机移动
            var feiji1 = function () {
                var flagSpeed = 5;
                var left;
                var top;
                var speed = 0;
                document.onkeydown = function (eve) {
                    var eve = eve || window.event;
                    flag = eve.keyCode;
                }

                document.onkeyup = function () {
                    flag = 0;
                };

                (function () {
                    var speed1 = 4;
                    var startTime = new Date(); //小导弹开始时间

                    var count = 1; //小导弹计数
                    timer = setInterval(function () {

                        /*敌方小导弹触发*/
                        flagForBoom++;
                        if (flagForBoom >= 8 && obj.length <= 10) {
                            start(startTime, count);
                            flagForBoom = 0;
                        }
                        //小导弹速度
                        if (speed1 <= 7) {
                            speed1 += 0.005;
                        }

                        /*敌方大导弹触发*/
                        flagForBigBoom++;
                        if (flagForBigBoom >= 100 && bigBoom.length < 5) {
                            boomCreateElem();
                            flagForBigBoom = 0;
                        }

                        //子弹移动
                        for (var j = 0; j < boomZD.length; j++) {
                            boomZD[j].boomFlash(j);
                        }
                        for (var i = 0; i < boomZD.length; i++) {
                            boomZD[i].bigBoomFlash(i);
                        }

                        /*处理飞机移动事件*/
                        left = fei.offsetLeft;
                        top = fei.offsetTop;
                        feiXY[0].x = left + fei.clientWidth / 2;
                        feiXY[0].y = top;
                        distanceOfFei(left + fei.clientWidth / 2, top + fei.clientHeight / 2, left, top, speed1);
                        switch (flag) {
                            case 0:
                                speed = 0;
                                break;
                            case 37:
                                if (left <= 0) {
                                    speed = 0;
                                } else {
                                    speed = flagSpeed;
                                }
                                fei.style.left = left - speed + 'px';
                                break;
                            case 39:
                                if (left + fei.clientWidth >= screen.clientWidth) {
                                    speed = 0;
                                } else {
                                    speed = flagSpeed;
                                }
                                fei.style.left = left + speed + 'px';
                                break;
                            case 38:
                                if (top <= 0) {
                                    speed = 0;
                                } else {
                                    speed = flagSpeed;
                                }
                                fei.style.top = top - speed + 'px';
                                break;
                            case 40:
                                if (top + fei.clientHeight >= screen.clientHeight) {
                                    speed = 0;
                                } else {
                                    speed = flagSpeed;
                                }
                                fei.style.top = top + speed + 'px';
                                break;
                        }
                        boomMoveStart(); //大导弹移动事件
                    }, 16);
                })();
            }

            /**
             * 子弹开始事件
             */
            var startBoom = function () {
                timerBom = setInterval(function () {
                    Boom();
                }, 200);
            };

            return {
                init: function () {
                    feiji1();
                    startBoom();
                    zdBIUBIU = new createZDRadio();
                    boomMoveStart();
                    forGameOver();
                }
            }
        })();
        return _rain;
    })();
    var rain = new rain();
}