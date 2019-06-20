<template>
  <div class="graph-block">
    <h1>Алгоритм Штор-Вагнера</h1>

    <textarea col="20" row="10" class="data" v-model="data"></textarea>

    <div><button @click="build()">Построить</button></div>

    <div id="graph"></div>

    <h3 v-if="minCut">Минимальный разрез: {{ minCut }}</h3>

  </div>
</template>

<script>

import minCut from '../lib/algoritm';
import _ from 'lodash';

const Dracula = require('graphdracula')


export default {

  data(){
    return {
      // initial value
      data: '{ "0": [0,2,0,1], "1": [2,0,30,0], "2": [0,30,0,40], "3": [1,0,40,0]}',
      g: [],
      minCut: null,
      edges: [],
    }
  },

  methods: {

    build(){

      // get array from textarea field
      this.g = _.toArray(JSON.parse(this.data));

      try{
        if(_.isObject(this.g) && !_.isEmpty(this.g)){
          //run algoritm Stor-Wagner
          var result = minCut(_.cloneDeep(this.g));

          // get bet weight of the graph
          this.minCut = result.best;

          //get edges for mappling incision
          this.edges = result.edges;

          // function for rendering graph
          this.renderGraph();
        }  
      }
      catch(e){ console.log(e) }
    },

    renderGraph(){
      // clear old graph
      document.getElementById('graph').innerHTML = '';
      var Graph = Dracula.Graph
      var Renderer = Dracula.Renderer.Raphael
      var Layout = Dracula.Layout.Spring

      var graph = new Graph();

      graph = this.buildGraph(graph);

      var layout = new Layout(graph)
      var renderer = new Renderer('#graph', graph, 800, 400)
      renderer.draw();
    },

    buildGraph(graph){

      var i, j;

      // render graph by initial matrix

      for(i = 0; i < this.g.length; i++){
        for(j = 0; j < this.g.length; j++){
          if(this.g[i][j] != 0){

            var edgeColor = (!_.includes(this.edges, this.g[i][j])) ? '#000' : '#f00';

            graph.addEdge(i+1,j+1,{
              label: this.g[i][j],
              fill: edgeColor,
              stroke: '#fff'
            })
          }    
        }
      }

      return graph;
    }
  }
}
</script>


<style lang="scss">
  
  .graph-block{
    max-width: 800;
    text-align: center;


    .data{
      width: 300px;
      height: 150px;
    }

  }

</style>
