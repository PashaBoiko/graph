<template>
  <div class="hello">
    <div id="graph"></div>
  </div>
</template>

<script>

const Dracula = require('graphdracula')

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    var Graph = Dracula.Graph
    var Renderer = Dracula.Renderer.Raphael
    var Layout = Dracula.Layout.Spring

    var graph = new Graph()

    graph.addEdge('4', '1',{
        label: 'test',
        directed: true,
        fill: "red",
        stroke: "#fff"
    })
    graph.addEdge('1', '2')
    graph.addEdge('1', '3')
    graph.addEdge('3', '4')
    graph.addEdge('2', '4')

    var layout = new Layout(graph)
    var renderer = new Renderer('#graph', graph, 500, 400)
    renderer.draw()
  }
}
</script>

