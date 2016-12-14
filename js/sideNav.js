/*
 * @Author: pao
 * @Date:   2016-12-14 09:56:32
 * @Last Modified by:   pao
 * @Last Modified time: 2016-12-14 14:16:02
 */

'use strict';
! function($) {
    var SideNav = function(option) {
        this.ele = option.$ele;
        this.container = this.ele.find(option.container);
        this.btn = this.container.find(option.btn);
        this.side = this.ele.find(option.side);
        this.sideR = this.side.find(option.sideR)
    };
    SideNav.prototype = {
        constructor: SideNav,
        init: function() {
            // this.translateX(this.side, '100%');
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
                that.translateX(that.side, 0);
                that.translateX(that.container, '70%');
                that.openTransition(that.side);
                that.openTransition(that.container);
                $(window).on('touchstart', that.preventDefault);
            })
        },
        toLeft: function() {
            var that = this;
            mobile.tap(this.sideR, function() {
                that.side.css('transform', '');
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
                    that.closeTransition(that.side); //一移动就关闭动画
                    that.closeTransition(that.container);
                    origin = that.container.width() * 0.7;
                    that.translateX(that.side, distance + 'px');
                    that.translateX(that.container, origin + distance + 'px');
                }
            });
            this.side.on('touchend', function(e) {
                if (distance < 0) {
                    if (Math.abs(distance) < origin / 3) {
                        that.translateX(that.side, 0);
                        that.translateX(that.container, '70%')
                    } else {
                        that.side.css('transform', '');
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
