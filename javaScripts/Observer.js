//the Observer;
function Observer(){
	this.callbacks = {};
}
Observer.callbacks = {};
Observer.add = Observer.prototype.add = function ( value, callback ){
	this.callbacks[ value ] ? this.callbacks[ value ].push( callback ) : this.callbacks[ value ] = [ callback ];
}

Observer.remove = Observer.prototype.remove = function ( value, callback ){
	var list = this.callbacks[ value ];
	if( list ){
		if( !callback ){
			delete this.callbacks[ value ];
		}else{
			for(var i = 0;  i < list.length; ++i ){
				if( callback == list[ i ]){
					list[ i ] = null;
			     }
            }
		}
	}
}

Observer.boradcast = Observer.prototype.boradcast = function( value ){
	var list = this.callbacks[ value ];
	if( list && list.length ){
		for(var  i = 0 ; i < list.length; ++i){
			var cb = list[ i ];
			if( typeof cb == 'function' ){
				cb.apply( cb, Array.prototype.slice.call( arguments, 1 ) )
			}else{
				list.splice( i, 1 );
				--i;
			}
		}
	}
}
var s = new Observer;
s.add('teacher',function( message ){ alert( message ) });
s.boradcast('teacher', 'helloworld');