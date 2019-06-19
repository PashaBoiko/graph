
	// var g = [[0,10,0,0,0,30],
	// 		 [10,0,4,0,0,20],
	// 		 [0,4,0,40,60,0],
	// 		 [0,0,40,0,50,0],
	// 		 [0,0,60,50,0,5],
	// 		 [30,20,0,0,5,0]];

	
	// let g = [[0,2,0,1],
	// 		 [2,0,30,0],
	// 		 [0,30,0,40],
	// 		 [1,0,40,0]];

	function minCut(g)
	{

		var edgesI = [];
		var edges = [];

		var test1 = [];
		var test = [];

		var n = g.length;
		const NN = n;

		//const MAXW = 40;
		var v = new Array(NN); 
		var w = new Array(NN);
		var na = new Array(NN);
		var a = new Array(NN);


		var MAXW = -1;

		_.each(g, (item) => {
			MAXW = Math.max(MAXW, _.max(item));
		})

	    // init the remaining vertex set
	    for( var i = 0; i < n; i++ ) v[i] = i;

	    // run Stoer-Wagner
	    var best = MAXW * n * n;

	    while( n > 1 )
	    {
	        // initialize the set A and vertex weights
	        a[v[0]] = true;
	        for( var i = 1; i < n; i++ )
	        {
	            a[v[i]] = false;
	            na[i - 1] = i;

	            w[i] = g[v[0]][v[i]];
	        }

	        // add the other vertices
	        var prev = v[0];


	        edgesI.push(_.cloneDeep(w));
	        for( var i = 1; i < n; i++ )
	        {

	            // find the most tightly connected non-A vertex
	            var zj = -1;
	            for( var j = 1; j < n; j++ ){
	            	if( !a[v[j]] && ( zj < 0 || w[j] > w[zj] ) ){
	                    zj = j;
	                }
	            }
	           


	            // add it to A
	            a[v[zj]] = true;

	            // last vertex?
	            if( i == n - 1 ){

	                if(w[zj] < best){
	                	best = w[zj];
	                	edges = _.cloneDeep(edgesI);

	                	var values = [];
	                	var test = [];

	                	for(var i=0; i < edges.length; i++){
	                		values.push(edges[i][zj])
	                	}

	                	var test = _.remove(_.uniq(values), (item) => item != best);
	                	test.push(best - _.sum(test));
	                }

	                // merge prev and v[zj]
	                for( var j = 0; j < n; j++ ){
	                    g[v[j]][prev] = g[prev][v[j]] += g[v[zj]][v[j]];

	                }
	                v[zj] = v[--n];
	                break;
	            }
	            prev = v[zj];
	           

	            //console.log("Enter: " +w[j])
	            // update the weights of its neighbours

	            for( var j = 1; j < n; j++ ) {
	            	if( !a[v[j]] ){
	                	w[j] += g[v[zj]][v[j]];

	            	}
	            }
	            edgesI.push(_.cloneDeep(w));	            
	        }
	    }


	    return {
	    	'best': best,
	    	'edges': test
	    }
	}

module.exports = minCut;
