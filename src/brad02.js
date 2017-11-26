var Brad02Layer = cc.Layer.extend({
    sprite:null,
    isDrag:false,
    rect0:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var n0 = new cc.Sprite(res.n0_png)
        n0.x = size.width * 1 / 4;
        n0.y = size.height * 1 / 14;
        this.addChild(n0);
        cc.log(n0.width + " x " + n0.height);
        this.rect0 = new cc.Rect(
            n0.x - n0.width/2,
            n0.y - n0.height/2,
            n0.width,
            n0.height
        );


        var n1 = new cc.Sprite(res.n1_png)
        n1.x = size.width * 1 / 4;
        n1.y = size.height * 3 / 14;
        this.addChild(n1);

        var n1ss = new cc.Sprite(res.n1ss_png);
        n1ss.x = size.width / 2;
        n1ss.y = size.height * 7 / 8;
        this.addChild(n1ss);

        var n1ssW = size.width / 10;
        var n1ssH = n1ssW;
        n1ss.setScale(n1ssW/n1ss.width, n1ssH/n1ss.height);

        cc.log(n1ssW);

        var rect2 = new cc.Rect(
            n1ss.x -n1ssW/2,
            n1ss.y -n1ssH/2,
            n1ssW,
            n1ssH
        );


/*
        var n1bb = new cc.Sprite(res.n1bb_png);
        n1bb.x = size.width / 2;
        n1bb.y = size.height * 5 / 8;
        this.addChild(n1bb);
        n1bb.setScale(n1ssW/n1bb.width, n1ssH/n1bb.height);
*/

        var myMouseListener = {
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                //this.isDrag = true;
                var layer = event.getCurrentTarget();

                var x = event.getLocationX();
                var y = event.getLocationY();
                var point = new cc.Point(x,y);


                if (cc.rectContainsPoint(layer.rect0, point)){
                    cc.log("got it");
                }


            },
            /*
            onMouseUp: function (event) {
                this.isDrag = false;
                cc.log("up");
            },
            onMouseMove: function (event) {
                if (!this.isDrag) return;
                cc.log("move");
            }
            */
        };
        cc.eventManager.addListener(myMouseListener, this);


        var myKeyboardListener = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                switch (keyCode){
                    case cc.KEY.up:
                        cc.log("up");
                        break;
                    case cc.KEY['down']:
                        cc.log("down");
                        break;
                    case cc.KEY.left:
                        cc.log("left");
                        break;
                    case cc.KEY.right:
                        cc.log("right");
                        break;
                    case cc.KEY[1]:
                        cc.log('1');
                        break;
                    case cc.KEY['2']:
                        cc.log('2');
                        break;

                }
            },
            /*
            onKeyReleased: function () {
                cc.log("key up");
            }
            */
        };
        cc.eventManager.addListener(myKeyboardListener, this);

        // canvas, focus() => keyboard listener =>
        cc.game.canvas.focus();

        return true;
    }
});


var Brad02Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Brad02Layer();
        this.addChild(layer);

    }
});