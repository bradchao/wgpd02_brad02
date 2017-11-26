var GameLayer = cc.Layer.extend({
    sprite:null,
    nums: new Array(10),    // Sprite
    rects: new Array(10),   // Sprite Rect
    enter: null,
    enterRect:null,
    back:null,
    backRect: null,
    input:null,
    mesg:null,
    inputString: '',
    answer : '',
    counter:0,
    winner:null,
    loser:null,
    dig:4,
    isGaming:true,
    ctor:function () {
        this._super();
        //var size = cc.winSize;

        this.initView();
        this.initListener();

        this.initGame();

        return true;
    },

    initView: function () {
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.sprite3_plist,
            res.sprite3_png);

        // title
        var title = new cc.LabelTTF('猜數字遊戲','Arial',48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 7 / 8;
        title.setColor(cc.color(255,255,0));
        this.addChild(title);

        // input
        this.input = new cc.LabelTTF('','Arial',48);
        this.input.x = cc.winSize.width / 2;
        this.input.y = cc.winSize.height * 6 / 8;
        this.input.setColor(cc.color(255,255,255));
        this.addChild(this.input);

        // result
        this.mesg = new cc.LabelTTF('請輸入三位數','Arial',36);
        this.mesg.x = cc.winSize.width / 2;
        this.mesg.y = cc.winSize.height * 5 / 8;
        this.mesg.setColor(cc.color(255,0,0));
        this.addChild(this.mesg);

        // number pad
        for (var i =0; i<this.nums.length; i++){
            cc.log("#n" + i + ".png");
            this.nums[i] = new cc.Sprite("#n" + i + ".png");
            var px, py;
            if (i==0){
                px = 1;
                py = 1;
            }else{
                px = (i-1) % 3 + 1;
                py = parseInt((i-1) / 3) + 2;
            }
            this.nums[i].x = cc.winSize.width * px / 4;
            this.nums[i].y = cc.winSize.height * py / 8;
            this.addChild(this.nums[i]);

            // rect
            this.rects[i] = new cc.Rect(
                this.nums[i].x - this.nums[i].width/2,
                this.nums[i].y - this.nums[i].height/2,
                this.nums[i].width,
                this.nums[i].height
                );
        }

        this.enter = new cc.Sprite("#enter.png");
        var px = 3, py = 1;
        this.enter.x = cc.winSize.width * px / 4;
        this.enter.y = cc.winSize.height * py / 8;
        this.addChild(this.enter);
        this.enterRect = new cc.Rect(
            this.enter.x - this.enter.width/2,
            this.enter.y - this.enter.height/2,
            this.enter.width,
            this.enter.height
        );

        this.back = new cc.Sprite("#back.png");
        var px = 2, py = 1;
        this.back.x = cc.winSize.width * px / 4;
        this.back.y = cc.winSize.height * py / 8;
        this.addChild(this.back);
        this.backRect = new cc.Rect(
            this.back.x - this.back.width/2,
            this.back.y - this.back.height/2,
            this.back.width,
            this.back.height
        );

        this.winner = new cc.Sprite(res.winner_png);
        this.winner.x = cc.winSize.width / 2;
        this.winner.y = cc.winSize.height / 2;
        this.addChild(this.winner);
        this.winner.setVisible(false);

        this.loser = new cc.Sprite(res.loser_png);
        this.loser.x = cc.winSize.width / 2;
        this.loser.y = cc.winSize.height / 2;
        this.addChild(this.loser);
        this.loser.setVisible(false);

    },
    initGame: function () {
        this.isGaming = true;
        this.winner.setVisible(false);
        this.loser.setVisible(false);
        this.counter = 0;
        this.answer = createAnswer(this.dig);
        this.inputString = '';
        this.input.setString(this.inputString);
        this.input.setColor(cc.color(255, 255, 255));

    },
    initListener: function () {
        var myMouseListener = {
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var layer = event.getCurrentTarget();
                var ex = event.getLocationX();
                var ey = event.getLocationY();
                var point = new cc.Point(ex,ey);

                if (!layer.isGaming){
                    cc.log();
                    // 開新局
                    layer.initGame();
                }else {

                    if (cc.rectContainsPoint(
                            layer.enterRect, point) &&
                        layer.inputString.length == layer.dig
                    ) {

                        // input enter
                        var result = checkAB(layer.answer,
                            layer.inputString);
                        layer.mesg.setString(result);
                        layer.counter++;

                        if (result === layer.dig + 'A0B') {
                            layer.winner.setVisible(true);
                            layer.isGaming = false;
                        } else if (layer.counter >= 3) {
                            layer.loser.setVisible(true);
                            layer.isGaming = false;
                        } else {
                            layer.inputString = '';
                            layer.input.setString(layer.inputString);
                            layer.input.setColor(cc.color(255, 255, 255));
                            layer.isGaming = true;
                        }


                    } else if (cc.rectContainsPoint(
                            layer.backRect, point) &&
                        layer.inputString.length > 0
                    ) {
                        // input back
                        layer.input.setColor(cc.color(255, 255, 255));
                        layer.inputString =
                            layer.inputString.substr(0, layer.inputString.length - 1);
                        layer.input.setString(layer.inputString);

                    } else if (layer.inputString.length < layer.dig) {
                        // input number
                        for (var i = 0; i < layer.rects.length; i++) {
                            if (cc.rectContainsPoint(
                                    layer.rects[i], point
                                ) && layer.inputString.indexOf(i) == -1) {
                                layer.inputString += i;
                                cc.log(layer.inputString);
                                layer.input.setString(layer.inputString);
                                break;
                            }
                        }

                        if (layer.inputString.length == layer.dig) {
                            layer.input.setColor(cc.color(255, 0, 0));
                        }

                    }
                }

            }
        };
        cc.eventManager.addListener(myMouseListener, this);
    },
});
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var colorLayer = new cc.LayerColor(cc.color(127,127,0),
            cc.winSize.width, cc.winSize.height);
        colorLayer.x = 0;
        colorLayer.y = 0;
        this.addChild(colorLayer,0);


        var layer = new GameLayer();
        this.addChild(layer,1);
    }
});

function checkAB(ans,guess) {
    var a, b; a = b = 0;
    for (var i=0; i<ans.length; i++){
        if (ans.charAt(i) == guess.charAt(i)){
            a++;
        }else if (ans.indexOf(guess.charAt(i)) !== -1){
            b++;
        }
    }
    return a +"A" + b + "B";
}

function createAnswer(d) {
    var n = [0,1,2,3,4,5,6,7,8,9];
    n = shuffle(n);
    var ret = '';
    for (var i=0; i<d; i++){
        ret += n[i];
    }

    return ret;
}

function shuffle(a) {
    var i, j, x;
    for (i=a.length; i; i--){
        j= parseInt(Math.random()*i);
        x = a[i-1];
        a[i-1] = a[j];
        a[j] = x;
    }
    return a;
}