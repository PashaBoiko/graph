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
      data: '{ "0": [0,10,0,0,0,30], "1": [10,0,4,0,0,20],"2": [0,4,0,40,60,0],"3": [0,0,40,0,50,0],"4": [0,0,60,50,0,5],"5": [30,20,0,0,5,0]}',
      g: [],
      minCut: null,
    }
  },

  mounted(){
   
  },

  methods: {

    build(){

      this.g = _.toArray(JSON.parse(this.data));

      try{
        if(_.isObject(this.g) && !_.isEmpty(this.g)){
          this.renderGraph();
          this.minCut = minCut(this.g);
        }  
      }
      catch(e){ console.log(e) }
    },

    renderGraph(){

      document.getElementById('graph').innerHTML = '';

      var Graph = Dracula.Graph
      var Renderer = Dracula.Renderer.Raphael
      var Layout = Dracula.Layout.Spring

      var graph = new Graph();

      graph = this.buildGraph(graph);

      //var layout = new Layout(graph)
      var renderer = new Renderer('#graph', graph, 800, 400)
      renderer.draw();
    },

    buildGraph(graph){

      var i, j;

      for(i = 0; i < this.g.length; i++){
        for(j = 0; j < this.g.length; j++){
          if(this.g[i][j] != 0){
            graph.addEdge(i+1,j+1,{
              label: this.g[i][j]
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
