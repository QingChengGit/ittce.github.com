//仿写下jQuery;加深下对js的理解
(function ( global, factory ){
	//这里是针对一些没有window和docuemnt对象的js环境;
	if( typeof module === 'object' && typeof module.exports === 'object' ){
		module.exprots = global.document ? 
		factory( global, true ):
		function ( w ){
			if( !w.window ){
				throw new Error( "jQuery requires  a window with a document");
			}
			return factory( w );
		}
	}else {
        factory( global );
    }
}( typeof window !== "undefined" ? window : this, function( window, noGlobal )
{
    //保存一个默认的数组；将数组的方法挂在此数组下
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

        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);
        },

        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

        fcamelCase = function (all, letter) {
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
        //基于merge函数，merge是将两个数组合并;
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
    //基于eq方法实现自身
	first : function(){
		return this.eq( 0 );
	},
    //基于eq方法实现自身
	last : function(){
		return this.eq( -1 );
	},
	eq: function( i ) {
		var len = this.length,
		j = + i+ ( i < 0 ? len : 0);
        //j = 索引+(所以小于0的话+len就变成从后查找了，否则正续查找）
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
        //如果满足条件也就是说j不是非法的就将this[j]找个dom对象pushStack进去;
	},

	end : function(){
        //将保存的在this上的prevObject再换给返回出去也就是上一次调用jQuery方法的对象
		return this.prevObject || this.constructor( null );
	},

    //将剩余的方法挂在deletedIds这个数组上;
	push : push,
	sort : deletedIds.sort,
	splice : deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
    //如果没有参数target = {} ; 有的话 target为第一个参数;

    target = arguments[ 0 ] || {},
    //索引i置为0;
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

jQuery.extend({
	expando: "jQuery" + ( version + Math.random() ).replace(/\D/g, ""),

	isReady: true,

	error: function( msg ){
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ){
		return jQuery.type(obj) === "function";
	},

	isArray: function ( obj ) {
		return jQuery.type(obj) === 'array';
	},

	isWindow: function( obj ){
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ){
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
			for( ; i < length; ++i ){
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

function markFunction( fn ){
	fn[ expando ] = true;
	return fn;
}

function assert( fn ) {
	var div = document.createElement("div");

	try{
		return !!fn( div );
	} catch ( e ){
		return false;
	} finally {

		if( div.parentNode ){
			div.parentNode.removeChild( div );
		}

		div = null ;
	}
}

function addHandle( attrs, handler ){
	var arr = attrs.split('|');
		i = attrs.length;

	while( i-- ){
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

function slibingcheck( a, b ){
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			(~b.sourceIndex || MAX_NEGATIVE)-
			(~a.sourceIndex || MAX_NEGATIVE);
	if( diff ){
		return diff;
	}

	if( cur ){
		while( (cur = cur.nextSibling) ){
			if( cur === b ){
				return -1;
			}
		}
	}
	return a ? 1 : -1;

}

function createInputPseudo ( type ){
	return function( elem ){
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	}
}

function createButtonPseudo( type ){
	return function( elem ){
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	}
}

function createPositionalPseudo( type ){
	return markFunction(function( argument ){
		argument = +argument;
		return markFunction( function( seed, matchs ){
			var j,
				matchIndexes = fn( [], seed.length, argument),
				i = matchIndexes.length;

			while( --i ){
				if( seed[ (j = matechIndexes[i])] ){
					seed = !( mateches[j] = seed[j] );
				}
			}
		})
	})
}

function testContext( context ){
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

support = Sizzle.support ={};

isXML = Sizzle.isXML = function( elem ){
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeType !== "HTML" : false;
}

setDocument = Sizzle.setDocument = function( node ){
	var hasCompare,parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	if( doc === document || doc.nodeType !== 9 || !doc.documentElement){
		return document;
	}

	doc = document;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	if( parent && parent !== parent.top){
		if( parent.addEventListener ){
			parent.addEventListener( "unload", unloadHandler,false )
		} else if( parent.attachEvent ){
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	documentIsXML = !isXML( doc );

	support.attributes = assert(function( div ){
		div.appendChild( doc.createElement("") );
		return !div.getElementsByTagName("*").length;
	});

	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	support.getById =  assert(function( div ){
		docElem.appendChild( div).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando).length;
	});

	if( support.getById ){
		Expr.find["ID"] = function( id, context ){
			if(typeof context.getElementById !== "undefined" && documentIsHTML ){
				var m = context.getElementById( id );
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ){
			var attrId = id.replace( runescape,funescape );
			return function( elem ){
				return elem.getAttribute("id") === attrId;
			}
		};
	} else {
		delete Expr.find["ID"];
		Expr.filter["ID"] = function( id ){
			var attrId = id.replace( runescape, funescape );
			return function( elem ){
				var node = typeof  elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			}
		}
	}

	//there  Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ){
			if( context.getElementsByTagName !== "undefined" ){
				return context.getElementsByTagName( tag );
			} else if( support.qsa ){
				return context.querySelectorAll( tag );
			}
		}:
		function ( tag, context ){
			var elem,
				tmp = [],
				i = 0,
				result = context.getElementsByTagName( tag );
			if( tag === "*" ){
				while( (elem = result[i++]) ){
					if( elem.nodeType === 1 ) {
						tmp.push(elem)
					}
				}
				return tmp;
			}
			return result;
		}
	//CLASS

	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ){
		if( documentIsHTML ){
			return context.getElementsByClassName( className );
		}
	};

	rbuggyMatches = [];
	rbuggyQSA = [];

	if( ( support.qsa = rnative.test( doc.querySelectorAll ) ) ){
		assert(function( div ){
			docElem.appendChild( div).innerHTML = "<a id='" +expando +"'></a>"+
				"<select id='" +expando+ "-\f]' msallowcaptrue=''>"+
				"<option selected=''></option></select>";
			if( div.querySelectorAll("[msallowcaptrue^='']").length ){
				rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");
			}
			//markdown
			if( !div. querySelectorAll("[selected]").length ){
				rbuggyQSA.push( "\\[" +whitespace + "*(?:value|" +blooeans +")" );
			}

			if( !div.querySelectorAll( "[id~=" +expando + "-]").length ){
				rbuggyQSA.push("~=");
			}

			if( !div.querySelectorAll(":checked").length ){
				rbuggyQSA.push(":checked");
			}

			if( !div.querySelectorAll( "a#" + expando + "+*").length ){
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ){
			var input = doc.createElement("input");
			input.setAttribute("type", "hidden");
			div.appendChild( input).setAttribute("name","D");

			if( div.querySelectorAll("[name=d]").length ){
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			if( div.querySelectorAll(":enabled").length ){
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if( (support.matchesSelector = rnative( (matches = docElem.matches ||
			docElem.webkitMatchesSelector||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ){

		assert(function( div ){

		})

	}


}
})
}))