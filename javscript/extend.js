function jQuery(){

}
jQuery.extend = jQuery.fn.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
    //如果没有参数target = {} ; 有的话 target为第一个参数;

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

    //
    if( typeof targer !== 'object' && !jQuery.isFunction( target )){
        target = {};
    }

    //当只有一个参数将this 赋值给 jQuery或者jQuery.fn赋值给target，取决于使用者调用的方式;这里有两个分支;如果此参数为
   //boolean时，此时无法进入循环，直接将target return出去;如果此参数不为
    if( i == length ){
        target = this;
        --i;
    }

    for( ; i < length; i++ ){
        if( ( options = arguments[i] ) != null ){
            for( name in options ){
                src = target[ name ];
                copy = options[ name ];

                if( target == copy){
                    continue;
                }

                if( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ){
                    if( copyIsArray ){
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];
                    }else{
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
                    target[ name ] = jQuery.extend( deep, clone, copy );
                } else if( copy != undefined ){
                    target[ name ] = copy;
                }
            }
        }
    }

    return target;
};