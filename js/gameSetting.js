/**
 * Created by Administrator on 2017/11/3 0003.
 */
window.onload = function () {
    var gameSeting = (function () {
        var arrayForAllPlane = ['img/planeImgs/FEIJI.png', 'img/planeImgs/new.gif',
            'img/planeImgs/new1.png', 'img/planeImgs/new2.png', 'img/planeImgs/new3.gif',
            'img/planeImgs/new4.png', 'img/planeImgs/new5.png', 'img/planeImgs/new6.png',
            'img/planeImgs/new7.png', 'img/planeImgs/new12.png'];  //存储所有飞机
        var arrayForAllWeapen = ['img/zidan/1.gif', 'img/zidan/1.png', 'img/zidan/2.gif',
            'img/zidan/3.gif', 'img/zidan/4.gif', 'img/zidan/5.gif', 'img/zidan/7.gif',
            'img/zidan/8.gif', 'img/zidan/9.gif', 'img/zidan/10.gif', 'img/zidan/1.gif',
            'img/zidan/1.png', 'img/zidan/2.gif', 'img/zidan/3.gif', 'img/zidan/4.gif',
            'img/zidan/5.gif', 'img/zidan/7.gif', 'img/zidan/8.gif', 'img/zidan/9.gif',
            'img/zidan/10.gif', 'img/zidan/1.gif', 'img/zidan/1.png', 'img/zidan/2.gif',
            'img/zidan/3.gif', 'img/zidan/4.gif', 'img/zidan/5.gif', 'img/zidan/7.gif',
            'img/zidan/8.gif', 'img/zidan/9.gif', 'img/zidan/10.gif']; //存储所有武器
        var arrayForCreatedPlane = [];//存储创建的飞机模型
        var arrayForCreatedBoom = [];//存储创建的导弹模型
        var flagPlane = new createPlaneModel();
        flagPlane.css.top = '-500px';
        var planeW = flagPlane.elem.clientWidth;
        var planeH = flagPlane.elem.clientHeight;
        var flagBoom = new createWeapenModel();
        flagBoom.css.top = '-500px';
        var boomW = flagBoom.elem.clientWidth;
        var boomH = flagBoom.elem.clientHeight;
        $('planeBoxInner').style.width = planeW * 3 + 'px';
        var leftPlane = $('ariPlaneUse');
        var leftBoom = $('ariBoomUse');
        leftPlane.style.background = getCookie("imgUrlAll");
        leftBoom.style.background = getCookie('imgUrlBAll');

        /**
         * 封装函数获取id属性
         */
        function $(id) {
            return document.getElementById(id);
        }

        /**
         * 接口函数，用于外界访问
         * @private
         */
        var _gameSet = function () {
            createPlane();
            createBoom();
            planePosition();
            boomPosition();
        }

        /**
         * 创建飞机模型
         * @type {Array}
         */
        function createPlaneModel() {
            var elem = document.createElement('div');
            elem.className = 'forPlaneBox';
            this.css = elem.style;
            this.elem = elem;
            this.css.left = '0px';
            this.background = null;
            $('planeBoxInner').appendChild(elem);
        }

        /**
         * 创建导弹模型
         */
        function createWeapenModel() {
            var elem = document.createElement('div');
            elem.className = 'forBoomBox';
            this.css = elem.style;
            this.elem = elem;
            this.css.left = '0px';
            this.background = null;
            $('boomBoxInner').appendChild(elem);
        }

        /**
         * 创建飞机
         */
        function createPlane() {
            for (var i = 0; i < arrayForAllPlane.length; i++) {
                var plane = new createPlaneModel();
                plane.css.background = 'url("' + arrayForAllPlane[i] + '") no-repeat 0px 40%';
                plane.background = 'url("' + arrayForAllPlane[i] + '") no-repeat';
                plane.css.backgroundSize = 'contain';
                plane.css.left = planeW * i + 'px';
                plane.elem.onclick = bindChoicePlane;
                arrayForCreatedPlane.push(plane);
                if (i < 3) {
                    plane.css.display = 'block';
                } else {
                    plane.css.display = 'none';
                }
            }
        }

        function createBoom() {
            for (var i = 0; i < arrayForAllWeapen.length; i++) {
                var boom = new createWeapenModel();
                boom.css.background = 'url("' + arrayForAllWeapen[i] + '") no-repeat';
                boom.css.backgroundSize = 'contain';
                boom.background = 'url("' + arrayForAllWeapen[i] + '") no-repeat';
                boom.css.backgroundSize = 'contain';
                boom.elem.onclick = bindChoiceBoom;
                arrayForCreatedBoom.push(boom);
                if (i < 7) {
                    boom.css.display = 'block';
                    boom.css.left = boomW * i + 'px';
                    boom.css.top = 3 + 'px';
                } else if (i >= 7 && i < 14) {
                    boom.css.display = 'block';
                    boom.css.left = boomW * (i - 7) + 'px';
                    boom.css.top = boomH + 15 + 'px';
                } else {
                    boom.css.display = 'none';
                }
            }
        }

        /**
         * 控制飞机图片位置轮播图
         */
        function planePosition() {
            $('prevFJ').onclick = function () {
                var firstElem = arrayForCreatedPlane.shift();
                arrayForCreatedPlane.push(firstElem);
                for (var j = 0; j < arrayForCreatedPlane.length; j++) {
                    if (j < 3) {
                        arrayForCreatedPlane[j].css.display = 'block';
                        arrayForCreatedPlane[j].css.left = planeW * j + 'px';
                    } else {
                        arrayForCreatedPlane[j].css.display = 'none';
                    }
                }
            }
            $('nextFJ').onclick = function () {
                var lastElem = arrayForCreatedPlane.pop();
                arrayForCreatedPlane.unshift(lastElem);
                for (var j = 0; j < arrayForCreatedPlane.length; j++) {
                    if (j < 3) {
                        arrayForCreatedPlane[j].css.display = 'block';
                        arrayForCreatedPlane[j].css.left = planeW * j + 'px';
                    } else {
                        arrayForCreatedPlane[j].css.display = 'none';
                    }
                }
            }
        }

        /**
         * 控制子弹图片位置轮播图
         */
        function boomPosition() {
            $('prevDD').onclick = function () {
                var prevElems = arrayForCreatedBoom.splice(0, 14);
                for (var k = 0; k < prevElems.length; k++) {
                    arrayForCreatedBoom.push(prevElems[k]);
                }
                for (var j = 0; j < arrayForCreatedBoom.length; j++) {
                    if (j < 7) {
                        arrayForCreatedBoom[j].css.display = 'block';
                        arrayForCreatedBoom[j].css.left = boomW * j + 'px';
                        arrayForCreatedBoom[j].css.top = 3 + 'px';
                    } else if (j >= 7 && j < 14) {
                        arrayForCreatedBoom[j].css.display = 'block';
                        arrayForCreatedBoom[j].css.left = boomW * (j - 7) + 'px';
                        arrayForCreatedBoom[j].css.top = boomH + 15 + 'px';
                    } else {
                        arrayForCreatedBoom[j].css.display = 'none';
                    }
                }
            }
            $('nextDD').onclick = function () {
                var lastElems = arrayForCreatedBoom.splice(arrayForCreatedBoom.length - 14, 14);
                for (var k = 0; k < lastElems.length; k++) {
                    arrayForCreatedBoom.unshift(lastElems[k]);
                }
                for (var j = 0; j < arrayForCreatedBoom.length; j++) {
                    if (j < 7) {
                        arrayForCreatedBoom[j].css.display = 'block';
                        arrayForCreatedBoom[j].css.left = boomW * j + 'px';
                        arrayForCreatedBoom[j].css.top = '3px';
                    } else if (j >= 7 && j < 14) {
                        arrayForCreatedBoom[j].css.display = 'block';
                        arrayForCreatedBoom[j].css.left = boomW * (j - 7) + 'px';
                        arrayForCreatedBoom[j].css.top = boomH + 15 + 'px';
                    } else {
                        arrayForCreatedBoom[j].css.display = 'none';
                    }
                }
            }
        }

        /**
         * 飞机选择
         */
        function bindChoicePlane() {
            var array = this.style.background.split(' ');
            setCookie("imgUrl", array[0], 365);
            setCookie("imgUrlAll", this.style.background, 365)
            var imgUrl = getCookie("imgUrlAll");
            leftPlane.style.background = imgUrl;
        }

        /**
         *
         */
        function bindChoiceBoom() {
            var array = this.style.background.split(' ');
            setCookie("imgUrlB", array[0], 365);
            setCookie("imgUrlBAll", this.style.background, 365)
            var imgUrl = getCookie("imgUrlBAll");
            leftBoom.style.background = imgUrl;
        }

        return _gameSet;
    })();
    var gameSet = new gameSeting();
}