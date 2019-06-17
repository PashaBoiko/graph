	

	

	// Adjacency matrix and some internal arrays
	//var g = [NN][NN];
	// var g = [[0, 20, 30, 10, 0],
	// 		 [20, 0, 40 , 0 ,30],
	// 		 [30, 40, 0, 5, 20],
	// 		 [10, 0, 5, 0, 20],
	// 		 [0, 30, 20, 20, 0]];
	// var g = [[0,10,0,0,0,30],
	// 		 [10,0,4,0,0,20],
	// 		 [0,4,0,40,60,0],
	// 		 [0,0,40,0,50,0],
	// 		 [0,0,60,50,0,5],
	// 		 [30,20,0,0,5,0]];
	var g = [[0,10,0,0,0,30],
			 [10,0,4,0,0,20],
			 [0,4,0,40,60,0],
			 [0,0,40,0,50,0],
			 [0,0,60,50,0,5],
			 [30,20,0,0,5,0]];
	// let g = [[0,2,0,1],
	// 		 [2,0,30,0],
	// 		 [0,30,0,40],
	// 		 [1,0,40,0]];

	
	

	function minCut(g)
	{

		var n = g.length;
		const NN = n;

		const MAXW = 40;
		var v = new Array(NN); 
		var w = new Array(NN);
		var na = new Array(NN);
		var a = new Array(NN);

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
	        for( var i = 1; i < n; i++ )
	        {
	            // find the most tightly connected non-A vertex
	            var zj = -1;
	            for( var j = 1; j < n; j++ )
	                if( !a[v[j]] && ( zj < 0 || w[j] > w[zj] ) )
	                    zj = j;

	            // add it to A
	            a[v[zj]] = true;

	            // last vertex?
	            if( i == n - 1 )
	            {
	                // remember the cut weight
	               
	                best = Math.min(best, w[zj]);


	                //  console.log("bats:" + w[zj]);
	                // console.log("vershina: " + w);
	                // console.log(g);
	                

	                // merge prev and v[zj]
	                for( var j = 0; j < n; j++ )
	                    g[v[j]][prev] = g[prev][v[j]] += g[v[zj]][v[j]];
	                v[zj] = v[--n];
	   
	                 
	                break;
	            }
	            prev = v[zj];

	            // update the weights of its neighbours
	            for( var j = 1; j < n; j++ ) if( !a[v[j]] )
	                w[j] += g[v[zj]][v[j]];
	        }
	    }



	    return best;
	}

module.exports = minCut;
