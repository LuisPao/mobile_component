/*
 * @Author: pao
 * @Date:   2016-12-14 09:56:32
 * @Last Modified by:   pao
 * @Last Modified time: 2016-12-14 15:29:13
 */

'use strict';
! function($) {
    var SideNav = function(option) {
        this.ele = option.$ele;
        this.container = this.ele.find(option.container);
        this.btn = this.container.find(option.btn);
        this.side = this.ele.find(option.side);
        this.sideL = this.side.find(option.sideL);
        this.sideR = this.side.find(option.sideR);
        this.ratio = option.ratio || .7;
        this._initCSS();
    };
    SideNav.prototype = {
        constructor: SideNav,
        _initCSS: function() {
            this.side.css({
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: '10',
                transform: "translateX(-100%)"
            });
            this.sideL.css({
                height: '100%',
                width: this.ratio * 100 + '%',
                float: 'left',
            });
            this.sideR.css({
                height: '100%',
                width: (1 - this.ratio) * 100 + '%',
                float: 'right'
            })
        },
        init: function() {
            this.drag();
            this.toRight();
            this.toLeft();
        },
        translateX: function($dom, distance) {
            $dom.css('transform', 'translateX(' + distance + ')');
        },
        openTransition: function($dom) {
            $dom.css('transition', 'all .3s');
        },
        closeTransition: function($dom) {
            $dom.css('transition', 'none');
        },
        preventDefault: function(e) {
            e.preventDefault();
        },
        toRight: function() {
            var that = this;
            mobile.tap(this.btn, function() {
                that.translateX(that.side, '0');
                that.translateX(that.container, that.ratio * 100 + '%');
                that.openTransition(that.side);
                that.openTransition(that.container);
                $(window).on('touchstart', that.preventDefault);
            })
        },
        toLeft: function() {
            var that = this;
            mobile.tap(this.sideR, function() {
                that.translateX(that.side, '-100%');
                that.container.css('transform', '');
                $(window).on('touchstart', that.preventDefault)
            })
        },
        drag: function() {
            var startX = 0,
                moveX = 0,
                origin = 0,
                distance,
                that = this;
            this.side.on('touchstart', function(e) {
                distance = 0;
                startX = e.touches[0].clientX;
            });
            this.side.on('touchmove', function(e) {
                moveX = e.touches[0].clientX;
                distance = moveX - startX;
                if (distance < 0) {
                    that.closeTransition(that.side);
                    that.closeTransition(that.container);
                    origin = that.container.width() * that.ratio;
                    that.translateX(that.side, distance + 'px');
                    that.translateX(that.container, origin + distance + 'px');
                }
            });
            this.side.on('touchend', function(e) {
                if (distance < 0) {
                    if (Math.abs(distance) < origin / 3) {
                        that.translateX(that.side, '0');
                        that.translateX(that.container, that.ratio * 100 + '%');
                    } else {
                        that.translateX(that.side, '-100%');
                        that.container.css('transform', '');
                        $(window).on('touchstart', that.preventDefault);
                    }
                }
                that.openTransition(that.side);
                that.openTransition(that.container);
            });

        }
    }
    $.fn.sideNav = function(option) {
        var defaultOption = {
            $ele: this
        };
        var settings = $.extend({}, defaultOption, option);
        var sideNav = new SideNav(settings);
        sideNav.init();
    }
}(Zepto);
