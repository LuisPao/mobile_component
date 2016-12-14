/*
 * @Author: pao
 * @Date:   2016-12-14 10:04:59
 * @Last Modified by:   pao
 * @Last Modified time: 2016-12-14 15:30:04
 */
'use strict';
! function(w) {

    w.mobile = {
        tap: function($dom, callback) {
            var start = 0;
            var isMoved = false;

            $dom.on('touchstart', function(e) {
                start = +new Date(); //获取触摸开始的时间
            });
            $dom.on('touchmove', function(e) {
                isMoved = true; //假如手指一动了会改变ismoved值
            });
            $dom.on('touchend', function(e) {
                if (!isMoved && Date.now() - start < 250) { //手指没有一动且点击的时间间隔小于150ms
                    callback && callback.call(this, e) //调用回调函数
                }
                isMoved = false; //假如手指移动了，需要重置isMoevd为false
            })
        }
    }

}(window);
