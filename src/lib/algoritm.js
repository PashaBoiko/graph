
	// test incidence matrix
	// var g = [[0,10,0,0,0,30],
	// 		 [10,0,4,0,0,20],
	// 		 [0,4,0,40,60,0],
	// 		 [0,0,40,0,50,0],
	// 		 [0,0,60,50,0,5],
	// 		 [30,20,0,0,5,0]];

	
	// test incidence matrix
	// let g = [[0,2,0,1],
	// 		 [2,0,30,0],
	// 		 [0,30,0,40],
	// 		 [1,0,40,0]];

	function minCut(g)
	{

		// array of all edges
		var edgesAllIteration = [];

		// array of all edges on the n iteration 
		var edgesAll = [];

		// array of best edges on the n iteration 
		var edgesBest = [];

		// Length of the graph
		var n = g.length;
		const NN = n;

		// a list of vertices that have been compressed into i
		var v = new Array(NN); 
		// a list of weight
		var w = new Array(NN);
		var na = new Array(NN);
		var a = new Array(NN);


		// calculation max weight of the initial graph
		var MAXW = -1;
		_.each(g, (item) => {
			MAXW = Math.max(MAXW, _.max(item));
		})

	    // init the remaining vertex set
	    for( var i = 0; i < n; i++ ) v[i] = i;

	    // run Stoer-Wagner, calculation initial weight of the graph
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

	        // add weight vector to array (need for the displaying incision)
	        edgesAllIteration.push(_.cloneDeep(w));
	        for( var i = 1; i < n; i++ ){
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


	            	// compare the best weight if the graph in the n-iteration with previous
	                if(w[zj] < best){
	                	// if yes, assign new weight
	                	best = w[zj];

	                	// next code get edges for mappings incision on the graph
	                	edgesAll = _.cloneDeep(edgesAllIteration);

	                	var values = [];
	                	var edgesBest = [];

	                	for(var i=0; i < edgesAll.length; i++){
	                		values.push(edgesAll[i][zj])
	                	}

	                	var edgesBest = _.remove(_.uniq(values), (item) => item != best);
	                	edgesBest.push(best - _.sum(edgesBest));
	                }

	                // merge prev and v[zj]
	                for( var j = 0; j < n; j++ ){
	                    g[v[j]][prev] = g[prev][v[j]] += g[v[zj]][v[j]];

	                }
	                v[zj] = v[--n];
	                break;
	            }
	            prev = v[zj];
	           
	            // update the weights of its neighbours
	            for( var j = 1; j < n; j++ ) {
	            	if( !a[v[j]] ){
	                	w[j] += g[v[zj]][v[j]];

	            	}
	            }
	            // add weight vector to array after transformations (need for the displaying incision)
	            edgesAllIteration.push(_.cloneDeep(w));	            
	        }
	    }


	    return {
	    	'best': best,
	    	'edges': edgesBest
	    }
	}

module.exports = minCut;
