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

	merge: function ( first, second ){
		var len = +second,
		j = 0,
		i = first.length;
		while ( j < len ){
			first[ i++ ] = second[ j++ ];
		}

		if( len !== len ){
			while( second[j] != void 0 ){
				first[ i++ ] = second[ j++ ];
			}
		}
		first.length = i;
		return first;
	},

	grep: function( elems, callback, invert ){
		var callbackInverse,
		matches = [],
		i = 0,
		length = elems.length,
		callbackExpect = !invert;

		for( ; i < length; i++ ){
			callbackInverse = !callback( elems[ i ], i );
			if( callbackInverse !== callbackExpect ){
				matches.push( elems[ i ] );
			}
		}
		return matches;
	},

	map: function( elems, callback, arg ){
		var value,
		i = 0,
		length = elems.length,
		isArray = isArraylike( elems ),
		ret = [];

		if( isArray ){
			for( ; i < length; i++ ){
				value = callback( elems[ i ], i, arg);

				if( value != null ){
					ret.push( value );
				}
			}
		} else {
			for( i in elems ){
				value = callback( elems[ i ], i , arg );

				if( value != null ){
					ret.push( value );
				}
			}
		}
		return concat.apply( [], ret );
	},

	guid: 1,

	proxy: function( fn, context ){
		var args, proxy, tmp;

		if( typeof context === 'string' ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		if( !jQuery.isFunction( fn )){
			return undefined;
		}

		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );

		};
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;
		return proxy;
	},

	now: function() {
		return +( new Date() );
	},
	support: support
});

jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
	function( i, name) {
		class2type[ "[object" + name + "]" ] = name.toLowerCase();
	});
function isArraylike( obj ){
	var length = obj.length,
		type = jQuery.type( obj );
	if( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if( obj.nodeType === 1 && length) {
		return true;
	}
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

var Sizzle = ( function( window ) {
	var i,
		support,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		expando = "sizzle" + 1 * new Date();
		preferredDoc = window.document,
		dirruns = 0, 
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ){
			if( a === b ){
				hasDuplicate = true;
			}
			return 0;
		},

		MAX_NEGATIVE = 1 << 31,

		hasOwn = ({}).hasOwnPrototype,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,

		indexOf = function( list, elem ){
			var i = 0;
			len = list.length;
			for( ; i < length ++i ){
				if( list[i] === elem ){
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		whitespace = "[\\x20\\t\\r\\n\\f]",

		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		identifier = characterEncoding.replace( "w", "w#" ),

		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			"*([*^$|!~]?=)" + whitespace +
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier +"))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + characterEncoding +")(?:\\(("+
			"('((?:\\\\.|[^\\\\'])*'|\"((?:\\\\.|[^\\\\\"])*)\")|"+
			"((?:\\\\.|[^\\\\()[\\]]|"+ attributes + ")*)|"+
			".*"+
			")\\)|)",
		rwhitespace = new RegExp( whitespace + "+", "g"),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
		
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*"),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace +")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID" : new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*") +")"),
			"ATTR": new RegExp( "^"+attributes ),
			"PSEUDO": new RegExp( "^" + pseudos),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textatea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibiling = /[+~]/,
		rescape = /'|\\/g,

		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" +whitespace +")|.)", "ig"),

		funescape = function( _, escaped, escapedWhitespace ){
			var high = "0x" + escaped - 0x10000;
			return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10| 0xD800, high & 0x3FF | 0xDC00 );
		},

		unloadHandler = function(){
			setDocument();
		};

		try{
			push.apply(
				( arr = slice.call( preferredDoc.childNodes )),
				preferredDoc.childNodes
			);

			arr[ preferredDoc.childNodes.length ].nodeType;
		} catch( e ) {
			push = { apply: arr.length ?
				function( target, els ){
					push_native.apply( target, slice.call(els) );
				}:
				function( target, els ){
					var j = target.length,
						i = 0;
					while ( (target[j++] = les[i++]) ) {}
					target.length = j - 1;
				}
			};
		}
		function Sizzle( selector, context, results, seed ) {
			var match, elem, m, nodeType,
				i, groups, old, nid, newContext, newSelector;
			if( ( context ? context.ownerDocument || context : preferredDoc ) !== document ){
				setDocument( context );
			}

			context = context || document;
			results = results || [];
			nodeType = context.nodeType;
			if( typeof selector !== "string" || !selector ||
				nodeType !== 1 && nodeType !== 9 && nodeType !== 11){

				return results;
			}

			if( !seed && documentIsHTML ){
				if( nodeType !== 11 && ( match = requickExpr.exec( selector ) ) ){
					if( (m = match[1]) ) {
						if( nodeType === 9 ){
							elem = context.getElementById( m );
							if( elem.id === m ){
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						if( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) && 
							contains( context, elem ) && elem.id === m) {
							results.push( elem );
							return results;							
						}
					}
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;
				} else if ( (m = match[3]) && support.getElementsByClassName ){
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			if( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType !== 1 && selector;

				if( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape , "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "']";

				i = groups.length;
				while( i-- ){
					groups[i] = nid + toSelector( groupsp[i] );
				}

				newContext = rsibiling.test( selector ) && testContext( context.parentNode ) || context ;
				newSelector = groups.join(',');
			}

			if( newSelector ){
				try{
					push.apply( results, 
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch( qsaError ){

				} finally{
					if( !old ){
						context.removeAttribute("id");
					}
				}
			}
		}
	}
	return select( selector.replace( rtrim, "$1"), context, results, seed );
}

function createCache(){
	var keys = [];

	function cache( key, value ){
		if( keys.push( key + " " ) > Expr.cacheLength ){
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}
})
}))