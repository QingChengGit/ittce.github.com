;(function(){
    // ( 21, 94 ) 定义了一些函数和方法包括
    jQuery = function( selector, context ){
        return new jQuery.fn.init( selector, context );
    };
//begin 21 row
    var
    // A central reference to the root jQuery(document)
    //存储一下jQuery(document);
        rootjQuery,

    // The deferred used on DOM ready
    //当dom准备好时使用
        readyList,

    // Support: IE9
    // For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
    //存储字符串"undefined"，在判断时使用;
        core_strundefined = typeof undefined,

    // Use the correct document accordingly with window argument (sandbox)
    //将window下的参数存储为变量;
        location = window.location,
        document = window.document,
        docElem = document.documentElement,//存储html标签;

    // Map over jQuery in case of overwrite
    //当window.jQuery被占用时使用;
        _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
    //当window.$被占用时使用;
        _$ = window.$,

    // [[Class]] -> type pairs
    //类型对最好后存储为class2type = {"[Object String]":"string","[Object Array]":"array"}
        class2type = {},

    // List of deleted data cache ids, so we can reuse them
    //删除数据缓存id列表,所以我们可以重用它们
        core_deletedIds = [],

        core_version = "2.0.3",

    // Save a reference to some core methods
    //保存引用的一些核心方法;合并，插入，截取，查找，转换字符串，是否是自身的属性或方法，去空格;
        core_concat = core_deletedIds.concat,//
        core_push = core_deletedIds.push,
        core_slice = core_deletedIds.slice,
        core_indexOf = core_deletedIds.indexOf,
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty,
        core_trim = core_version.trim,

    // Define a local copy of jQuery
    //实例化jQuery;
        jQuery = function( selector, context ) {
            // The jQuery object is actually just the init constructor 'enhanced'
            //jQuery对象实际上只是init构造函数“增强”
            return new jQuery.fn.init( selector, context, rootjQuery );
        },

    // Used for matching numbers
    //匹配数字科学记数法，带小数的
    //等价于"[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)"
        core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

    // Used for splitting on whitespace
    //用空格分割
        core_rnotwhite = /\S+/g,


    // A simple way to check for HTML strings
    //一条简单的路去检查HTML字符串
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    //让id比tag优先，用来避免使用xss来攻击location.hash
    // Strict HTML recognition (#11290: must start with <)
    //严格的识别（必须以<开头）
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

    // Match a standalone tag
    //匹配一个独立的标签;
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

    // Matches dashed string for camelizing
    //匹配ie的前缀转法  MsBorderRadius  标准浏览器为:webkitBorderRadius;
        rmsPrefix = /^-ms-/,

        rdashAlpha = /-([\da-z])/gi,
    //找到 margin-left 找到-l 操作它

    // Used by jQuery.camelCase as callback to replace()
    //使用jQuery.camelCase替代()的回调
        fcamelCase = function( all, letter ) {
            return letter.toUpperCase();
        },

    // The ready event handler and self cleanup method
    //监听load事件
        completed = function() {
            document.removeEventListener( "DOMContentLoaded", completed, false );
            window.removeEventListener( "load", completed, false );
            jQuery.ready();
        };

    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: core_version,
        //版本号
        constructor: jQuery,
        //修正原型的指向
        init: function (selector, context, rootjQuery) {//选择器，上下文，document
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            //如果无效直接返回;处理异常
            if (!selector) {
                return this;
            }

            // Handle HTML strings
            //处理HTML字符串
            if (typeof selector === "string") {//判断字符串
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    //假设以<开头，>结尾的是HTML，跳过正则检查
                    match = [null, selector, null];

                } else {
                    match = rquickExpr.exec(selector);
                    //match 等于一个包含id 或者标签名的数组
                }

                // Match html or make sure no context is specified for #id
                //匹配html 或 确保没有上下文的是指定的id
                if (match && (match[1] || !context)) {
                    //判断match的解果
                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        //将context 指定为 原生的Dom对象 document
                        // scripts is true for back-compat
                        jQuery.merge(this, jQuery.parseHTML(//parseHTML 将字符串列表的标签转换为数组
                            match[1],//merge 将 数组合并到this上变为json形式
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));

                        // HANDLE: $(html, props)
                        //处理:$(html,状态)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                // Properties of context are called as methods if possible
                                //如果需要将需要的作为上下文的属性;
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                        //处理$(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        // Check parentNode to catch when Blackberry 4.6 returns
                        //检查父节点去存储如果是黑莓4.6的话返回
                        // nodes that are no longer in the document #6963
                        //节点不在文档中
                        if (elem && elem.parentNode) {
                            // Inject the element directly into the jQuery object
                            //将元素直接注入到jQuery对象中
                            this.length = 1;
                            this[0] = elem;
                        }
                        //制定上下文和选择器;
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    //如果不存在上线文或者上下文有jquery属性和方法，调用find在上下文或document中查找他
                    return ( context || rootjQuery ).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                    //和$(context).find(expr)等价的
                } else {
                    //否则返回jQuery(context).find(selector)；
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
                //处理：$(DOMElement)；dom元素;
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                //处理$(function)
                // Shortcut for document ready
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready(selector);
                //返回document.ready(selector)
            }

            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray(selector, this);
            //返回一个数组出去
        }
}
//end 205 row
    //( 96, 283 ) 给jQuery对象的原型上绑定属性和方法;
    jQuery.fn.init.prototype = jQuery.fn;
    //(其实就是jQuery.prototype);

    //( 285, 347 ) jQuery的extend方法

    //( 349, 817 ) 利用jQuery.extend 给构造函数绑定的静态方法;

    //( 877, 2845 ) jQuery的Sizzle选择引擎;

    //( 2880, 3042 ) jQuery的函数管理 观察者模式;
    jQuery.callbacks = function( options ){
    };

    // ( 3043, 3183 ) jQuery Deferred 对象,对异步的管理;

    // ( 3184, 3295 ) support 功能检测，通过功能来检测浏览器;

    // ( 3308, 3652 ) jQuery data 数据缓存和管理;

    // ( 3653, 3797 ) 熟悉的queue; 队列管理;

    // ( 3083, 4299 ) 对元素属性的操作; attr()  prop()  val()

    //( 4323, 5128 ) jQuery 事件管理系统;

    // ( 5140, 6057 ) Dom的获取和操作;

    // ( 6058, 6620 ) jQuery 对  css 样式的操作;

    //( 6621, 7854 ) jQuery 关于数据提交 和ajax 的封装;

    //( 7855, 8584 ) jQuery 运动相关;

    // ( 8585, 8792 ) jQuery offset() 位置相关;

    // ( 8797, 8799 ) jQuery.fn.size();
    jQuery.fn.size = function(){
        return this.length;
    }
    //( 8804, 8821 ) jQuery 对模块化的支持;

    //( 8825, 8827 ) jQuery对外提供的接口
    if( typeof window === 'object' && typeof window.document === 'object' ){
        window.jQuery = window.$ = jQuery;
    }

})( window );