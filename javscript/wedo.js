//仿写下jQuery;加深下对js的理解
(function ( global, factory ){
	
	if( typeof module === 'object' && typeof module.exports === 'object' ){
		module.exprots = global.document ? 
		factory( global, true ):
		function ( w ){
			if( !w.window ){
				throw new Error( "jQuery requires  a window with a document");
			}
			return factory( w );
		}else{
			factory( global );
		}
	}
}( typeof window !== 'undefined' ? window : this, factory( window, noGlobal ){
	var deletedIds = [];

	var slice = deletedIds.slice;

	var concat = deletedIds.concat;

	var push = deletedIds.push;

	var indexOf = deletedIds.indexOf;

	var class2type = {};

	var hasOwn = class2type.hasOwnPrototype;

	var support = {};

	var 
		version = '1.11.2',

		jQuery = function ( selector, context ){
			return new jQuery.fn.init( selector, context );
		},

		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		fcamelCase = function( all, letter ){
			return letter.toUpperCase();
		};
jQuery.fn = jQuery.prototype = {
	jquery : version,

	constructor : jQuery,

	selector : "",

	length : 0,

	toArray :function(){
		return slice.call(this);
	},

	get : function( num ){
		return num != null ? ( num < 0 ? this[ num + this.length ] : this[ num ]):
		slice.call(this);
	},

	pushStack : function ( elems ) {
		var ret = jQuery.merge( this.constructor(), elems );

		ret.prevObject = this ; //这里存下这个DOM对象，当end()的时候把this改为ret.prevObject;

		ret.context = this.context;

		return ret;
	},

	each : function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map : function ( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ){
			return callback.call( elem, i, elem );
		}));
	},

	slice : function(){
		return this.pushStack ( slice.apply( this, arguments ) );
	},

	first : function(){
		return this.eq( 0 );
	},
	last : function(){
		return this.eq( -1 );
	},
	eq: function( i ) {
		var len = this.length,
		j = + i+ ( i < 0 ? len : 0);
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end : function(){
		return this.prevObject || this.constructor( null );
	},

	push : push,
	sort : deletedIds.sort,
	splice : deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone, 
	target = arguments[ 0 ] || {},
	i = 1;
	length = arguments.length,
	deep = false;

	if( typeof target == 'boolean'){
		deep = target;
		target = arguments[ i ] || {};
		++i;
	}

	if( typeof targer !== 'object' && !jQuery.isFunction( target )){
		target = {};
	}

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

jQuery.extend({
	expando : "jQuery" + ( version + Math.random() ).replace(/\D/g, ""),

	isReady : true,

	error : function( msg ){
		throw new Error( msg );
	},

	noop : function() {},

	isFucntion : fucntion( obj ){
		return jQuery.type(obj) === "function";
	},

	isArray : function ( obj ) {
		return jQuery.type(obj) === 'array';
	},

	isWindow : function( obj ){
		return obj != null && obj == obj.window;
	},

	isNumeric : function( obj ){
		return !jQuery.isArray(obj) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject : function( obj ){
		var name;
		for ( name in obj ){
			return false;
		}
		return true;
	},

	isPlainObject : function( obj ){
		var key;

		if( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj )){
			return false;
		}

		try{
			if( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj,constructor.prototype, "isPrototypeOf")){
				return false;
			}
		} catch ( e ) {
			return false;
		}

		if( support.ownLast ){
			for( key in obj ){
				return hasOwn.call( obj, key );
			}
		}

		for( key in obj ){}

		return key === undefined || hasOwn.call( obj, key );
	},

	type : function ( obj ){
		if( obj == null){
			return obj +  '';
		}
		return typeof obj === "object" || typeof obj === "function"?
		class2type[ toString.call(obj) ] || "object" : typeof obj;
	},

	globalEval : function( data ){
		if( data && jQuery.trim( data ) ){
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			})( data );
		}
	},

	camelCase: function( string ){
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ){
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function(  obj, callback, args ){
		var value,
		i = 0,
		length = obj.length,
		isArray = isArraylike( obj );

		if ( args ){
			if( isArray ){
				for( ; i < length; i++){
					value = callback.apply( obj[ i ], args );

					if( value === false ){
						break;
					}
				}
			} else {
				for( i in obj ){
					value = callback.apply( obj[ i ], args );

					if( value === false ){
						break;
					}
				}
			}
		} else {
			if( isArray ){
				for( ; i < length; i++){
					value = callback.call( obj[i], i, obj[ i ] );
					if( value == false){
						break;
					}
				}
			}else{
				for( i in obj ){
					value = callback.call( obj[ i ], i, obj[ i ] );
					if( value == false ){
						break;
					}
				}
			}
		}
		return obj;
	},

	trim: function( text ){
		return	text != null ?
		"":
		( text + '' ).replace(rtrim, '');
	},

	makeArray: function( arr, results ){
		var ret = results || [];

		if( arr != null ){
			if( isArraylike( Object(arr) ) ){
				jQuery.merge( ret, 
					typeof arr === 'string'? [ arr ] : arr
				);

			} else {
				push.call( ret, arr );
			}
		}
		return ret;
	},

	inArray: function( elem, arr, i ){
		var len;
		if( arr ){
			if ( indexOf ){
				return indexOf.call( arr, elem, i);
			}
			len = arr.length;
			i = i ? i < 0 ? Math.max( 0 , len + i ) : i : 0;
			for( ; i < len; i++){
				if( i in arr && arr[ i ] == 'elem' ){
					return i;
				}
			}
		}
		return -1;
	},
})

}))