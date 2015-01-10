function jQuery(){

}
jQuery.extend = jQuery.fn.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
    //设置target为第一个参数或者空对象;
    target = arguments[ 0 ] || {},
    //索引i置为1;
    i = 1;
    length = arguments.length,
    deep = false;

    //如果第一个参数为一个boolean的值，将其赋值给deep，然后继续遍历 arguments
    if( typeof target == 'boolean'){
        deep = target;
        target = arguments[ i ] || {};
        ++i;
    }

    //如果target 不是一个对象也不是一个函数，将target设置为一个空对象；
    if( typeof targer !== 'object' && !jQuery.isFunction( target )){
        target = {};
    }

    //如果i == length 讲target设置为 this 根据调用方式不同this 可能为jQuery 或jQuery.fn
    if( i == length ){
        target = this;
        --i;
    }

    for( ; i < length; i++ ){
        if( ( options = arguments[i] ) != null ){
            //排除不正常的对象，循环此对象
            for( name in options ){
                src = target[ name ];
                copy = options[ name ];
                //如果copy为target的引用，跳过此次循环避免死循环;
                if( target == copy){
                    continue;
                }
                //如果deep为true，copy有值，copy是一个对象或者Array 此时进行深度复制；
                if( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ){
                    if( copyIsArray ){
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];
                    }else{
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
                    //递归调用自身进行深度复制
                    target[ name ] = jQuery.extend( deep, clone, copy );
                } else if( copy != undefined ){
                    //如果没有传deep，进行浅复制；
                    target[ name ] = copy;
                }
            }
        }
    }
//返回集成后的对象;
    return target;
};