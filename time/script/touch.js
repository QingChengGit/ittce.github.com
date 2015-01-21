/*
  只考虑 webkit 浏览器.
*/

;(function(root) {

/*
  tap
  swipe
  swipeLeft/swipeRight/swipeUp/swipeDown
*/

// @note: 依赖消息通知系统
// 需要支持 listen/notify/remove
var ep = Light;
var touch = {};
var maxTapDelta = 5;
var minSwipeDelta = 30;
var maxTapTimeout = 300;
var isHaveMoved = false;
var id = 0;

function walkdom(target, handle) {
  while(target && target.nodeType == 1) {
    var ret = handle(target);
    if (ret) return target;
    target = target.parentNode;
  }
  return false;
}

function bind( dom, name, callback ) {
  ep.listen( name, function(touch, e) {
    walkdom( touch.target, function(target) {
      if ( target == dom ) {
        callback.call(target, touch, e);
        return true;
      }
    });
  });
}

function swipeDirection(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ?
      (x1 - x2 > 0 ? 'Left' : 'Right') :
      (y1 - y2 > 0 ? 'Up' : 'Down')
}

function reset() {
  down = isHaveMoved = false;
  touch = {};
}

function start(e) {
  var item = e.touches[0];
  var target = item.target;
  touch.target = target;
  touch.x1 = item.pageX;
  touch.y1 = item.pageY;
  touch.last = Date.now();
  touch.id = id++;
}

function move(e) {
  // e.preventDefault();
  var item = e.touches[0];
  touch.x2 = item.pageX;
  touch.y2 = item.pageY;
  isHaveMoved = Math.abs(touch.x1 - touch.x2) > maxTapDelta ||
    Math.abs(touch.y1 - touch.y2) > maxTapDelta;
  ep.notify( 'drag', touch, e );
}

function end(e) {
  if (isHaveMoved) {
    if (
      Math.abs( touch.x1 - touch.x2 ) > minSwipeDelta ||
      Math.abs( touch.y1 - touch.y2 ) > minSwipeDelta
    ) {
      var direction = swipeDirection(touch.x1, touch.y1, touch.x2, touch.y2);
      ep.notify('swipe' + direction, touch, e);
    }
    ep.notify('swipe', touch, e);
  } else {
    var now = Date.now();
    touch.delta = Date.now() - touch.last;
    if (now - touch.last <= maxTapTimeout ) {
      ep.notify('tap', touch, e);
    }
  }
  ep.notify('touchend', touch, e);
  reset();
}

document.addEventListener('touchstart', start, false);
document.addEventListener('touchmove', move, false);
document.addEventListener('touchend', end, false);
document.addEventListener('touchcancel', reset, false);

root.bind = bind;

})(this);
