var Brad01Layer = cc.Layer.extend({
    dx:4,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        cc.log('size:' + size.width + 'x' + size.height);

        var title = new cc.LabelTTF('猜數字遊戲','Arial',40);
        title.x = size.width / 2;
        title.y = size.height * 13 / 14;
        title.setColor(cc.color(255,255,255));
        this.addChild(title, 0, 'mytitle');

        var prompt = new cc.LabelTTF('輸入三位數','Arial',40);
        prompt.x = size.width / 2;
        prompt.y = size.height * 11 / 14;
        prompt.setColor(cc.color(255,255,255));
        this.addChild(prompt);


        var n0 = new cc.Sprite(res.n0_png)
        n0.x = size.width * 1 / 4;
        n0.y = size.height * 1 / 14;
        this.addChild(n0);

        var n1 = new cc.Sprite(res.n1_png)
        n1.x = size.width * 1 / 4;
        n1.y = size.height * 3 / 14;
        this.addChild(n1);

        var n2 = new cc.Sprite(res.n2_png)
        n2.x = size.width * 2 / 4;
        n2.y = size.height * 3 / 14;
        this.addChild(n2);

        var n3 = new cc.Sprite(res.n3_png)
        n3.x = size.width * 3 / 4;
        n3.y = size.height * 3 / 14;
        this.addChild(n3);


        var n4 = new cc.Sprite(res.n4_png)
        n4.x = size.width * 1 / 4;
        n4.y = size.height * 5 / 14;
        this.addChild(n4);

        var n5 = new cc.Sprite(res.n5_png)
        n5.x = size.width * 2 / 4;
        n5.y = size.height * 5 / 14;
        this.addChild(n5);

        var n6 = new cc.Sprite(res.n6_png)
        n6.x = size.width * 3 / 4;
        n6.y = size.height * 5 / 14;
        this.addChild(n6);


        var n7 = new cc.Sprite(res.n7_png)
        n7.x = size.width * 1 / 4;
        n7.y = size.height * 7 / 14;
        this.addChild(n7);

        var n8 = new cc.Sprite(res.n8_png)
        n8.x = size.width * 2 / 4;
        n8.y = size.height * 7 / 14;
        this.addChild(n8);

        var n9 = new cc.Sprite(res.n9_png)
        n9.x = size.width * 3 / 4;
        n9.y = size.height * 7 / 14;
        this.addChild(n9);

        //sayYa();
        //this.sayHello();

        this.scheduleUpdate();
        this.mymouseListener();

        return true;
    },

    mymouseListener:function () {
        if ('mouse' in cc.sys.capabilities){
            cc.log('mouse ok');
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown:function (event) {
                  cc.log(event.getLocationX() + " x " + event.getLocationY());
                },
            };
            cc.eventManager.addListener(mouseListener, this);

        }else{
            cc.log('mouse xx');
        }
    },

    update: function () {
        //cc.log('update');
        var title = this.getChildByName('mytitle');

        if (title.x + title.width /2 > cc.winSize.width ||
            title.x - title.width /2 < 0){
            this.dx *= -1;
        }
        title.x += this.dx;
    },

    sayHello: function () {
        cc.log('Hello');
    },

});

function sayYa(){
    cc.log('Ya');
}


var Brad01Scene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        this.addChild(new Brad01Layer())
    },
});