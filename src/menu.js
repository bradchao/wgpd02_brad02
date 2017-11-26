
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        this.initMenu();

        return true;
    },

    initMenu: function () {
        cc.MenuItemFont.setFontSize(72);
        var start = new cc.MenuItemFont("Start",
            this.doStart, this);
        var setting = new cc.MenuItemFont("Setting",
            this.doSetting, this);
        var menu = new cc.Menu(start, setting);
        menu.alignItemsVertically();
        this.addChild(menu);
    },

    doStart: function () {
        cc.log("doStart");
        cc.director.pushScene(new GameScene());
    },

    doSetting:function () {
        cc.log("doSetting");
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});