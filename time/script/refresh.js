;(function(root) {

// 简单封装 transition.
var pfx = (function () {
  var style = document.createElement('dummy').style,
      prefixes = 'Webkit Moz O ms Khtml'.split(' '),
      memory = {};
  return function ( prop ) {
      if ( typeof memory[ prop ] === "undefined" ) {
          var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),
              props   = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');
          memory[ prop ] = null;
          for ( var i in props ) {
              if ( style[ props[i] ] !== undefined ) {
                  memory[ prop ] = props[i];
                  break;
              }
          }
      }
      return memory[ prop ];
  };
})();

function css( elem, prop ) {
  if ( typeof prop === 'string' ) {
    if ( prop.indexOf( ':' ) > -1 ) return elem.style.cssText = prop;
    else {
      var style = window.getComputedStyle( elem );
      return style[ prop ];
    }
  }
  var key, pkey;
  for ( key in prop ) {
    if ( prop.hasOwnProperty(key) ) {
       pkey = pfx( key );
       if ( pkey ) {
         elem.style[ pkey ] = prop[ key ];
       }
    }
  }
}

root.css = css;

})(this);


;(function() {

// Loading 容器添加 #refresh
var container = document.getElementById('refresh');
var deltaY = 0;
var fix = 0.3;
var maxDragHeight = 200;
var isLoading = false;
var rotateClass = 'rotate';
var isDraged = false;
bind(container, 'drag', function(touch, e) {
  var delta = touch.y2 - touch.y1;
  if (container.scrollTop == 0 && delta > 0) {
    e.preventDefault();
  }
  if (isLoading) return;
  isDraged = true;
  deltaY = Math.min(maxDragHeight, delta) * fix;
  if (deltaY > 0) {
    css(container, {
      transition: '',
      transform: 'translate(0,' + deltaY + 'px)'
    });
  }
});

bind(container, 'touchend', function() {
  if (isLoading) return;
  if (!isDraged) return;
  if (deltaY < maxDragHeight * fix) {
    css(container, {
      transition: 'all .2s ease',
      transform: 'translate(0)'
    });
  }
  else {
    container.classList.add(rotateClass);
    var id = container.getAttribute('data-key');
    isLoading = true;
    Light.notify('sendMessage', id, function() {
      isLoading = false;
      container.classList.remove(rotateClass);
      css(container, {
        transition: 'all .2s ease',
        transform: 'translate(0)'
      });
    });
  }
});

// @todo:
// 使用 ajax 请求代替 setTimeout
Light.listen('sendMessage', function(id, callback) {
  console.log( 'id: ', id );
  setTimeout(function() {
    callback();
  }, 1000 * 2);
});

})();

