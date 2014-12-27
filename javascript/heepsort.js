function heepsort( array ){
	bulideMax( array );
	for( var i = array.length -1; i >= 0; -- i){
		swap(array,  0, i );
		adjust( array, 0 , i);
	}
}

function bulideMax( array){
	var  i = Math.floor(array.length/2);
	for( ; i >= 0; --i ){
		adjust( array, i, array.length );
	}

}
function adjust( array, i , j ){
	var larger = i;
	var left = 2*i + 1;
	var right = 2 * i + 2;
	if( left < length && array[ left ] > array[ larger ] ){
		larger = left;
	}

	if( right < length && array[ right ] > array[ larger ] ){
		larger = right;
	}

	if( larger != i ){
		swap( array, larger, i );
		adjust( array, larger, j );
	}
}

function swap( array, i , j ){
	var tmp = array[ i ];
	array[ i ] = array[ j ];
	array[ j ] = tmp;
}

var arr = [ 2, 3, 1, 10, 2, 4, 5, 2, 1, 0 ];
deepsort( arr );