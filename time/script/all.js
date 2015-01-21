;(function() {

  var layer = $('#layer-request');
  var message = $('#layer-message');
  var SHOW_LAYER_TARGET_BY_CLASS = 'layer-display';

  function display(node, type) {
    $( '.' + SHOW_LAYER_TARGET_BY_CLASS ).removeClass(SHOW_LAYER_TARGET_BY_CLASS);
    if (type) {
      node.addClass( SHOW_LAYER_TARGET_BY_CLASS );
    }
  }

  function beforeDisplayEditor() {
  }

  function checkMessageBeforeSend() {
    alert('@todo..');
    return true;
  }

  function highlightUserInput() {
    // 确认如何显示错误信息.
  }

  function sendMessage(cb) {
    // @todo:
    // ajax 请求
    // 普通提交表单
  }

  var timer;
  function showMessage() {
    display(message, 1);
    timer = setTimeout(function() {
      display(message, 0);
    }, 1.5 * 1000);
  }

  function walkdom(target, handle) {
    while(target && target.nodeType == 1) {
      if(handle(target)) {
        return target;
      }
      target = target.parentNode;
    }
    return false;
  }

  function isInLayer(target) {
    return walkdom(target, function(target) {
      return target.className.indexOf(SHOW_LAYER_TARGET_BY_CLASS) > -1;
    });
  }

  function findDo(target) {
    return walkdom(target, function(target) {
      return target.hasAttribute('data-do');
    });
  }

  var dox = {
    'show-menu': function(e) {
      var dom = $('.head-menu');
      display(dom, 1);
    },
    'goto-request-editor': function(e) {
      display(layer, 1);
    },
    'remove-layer': function(e) {
      display(null, 0);
    },
    'follow': function() {
      // pingback
      display(null, 0);
    },
    'report': function() {
      // pingback
      display(null, 0);
    },
    'join': function() {},
    'comment': function() {
      display(layer, 1);
    }
  };

  bind( document.body, 'tap', function(touch, e) {
    var target = touch.target;
    var doTarget =  findDo(target);
    if (doTarget) {
      e.preventDefault();
      var x = $(doTarget).data('do');
      var names = x.split(/\s+/);
      for (var i = 0, l = names.length; i < l; ++i) {
        var name = names[i];
        if ('function' === typeof dox[name]) {
          dox[name](e);
        }
      }
    } else if (!isInLayer(target)) {
      display(null, 0);
    }
  });

  bind( document.getElementById('btn-send-request'), 'tap', function(touch, e) {
    e.preventDefault();
    e.stopPropagation();

    var result = checkMessageBeforeSend();

    if ( !result ) {
      return highlightUserInput();
    }

    // @todo:
    // 显示正在请求中....
    sendMessage(function(ret) {
      display(layer, 0);
      if ( ret == 0 ) {
        showMessage(ret);
      }
    });
  });

})();
