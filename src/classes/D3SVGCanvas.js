import * as d3 from "d3";

//Contenedor de d3... Obtiene los datos del visualizationContext y
//realiza el trabajo grafico que corresponda al paso.
class SVGCanvas {
  constructor(container) {
    this.container = container;
    this.hasData = false;
    this.setCanvas();
  }

  setCanvas() {
    this.svg = d3
      .select(this.container.current)
      .append("svg")
      .attr("height", 800)
      .attr("width", 800)
      .call(
        d3
          .zoom()
          .on("zoom", (event, d) => {
            this.svg.attr("transform", event.transform);
          })
          .scaleExtent([1, 5])
          .translateExtent([[0, 0], [800, 800]])
      );
  }

  draw(data, special, visualization) {
    //Dibuja los graficos

    visualization(this.svg, data, special);

    this.hasData = true;
  }

  redraw(data, special, visualization) {
    //Redibuja los graficos
    d3.select(this.container.current).select("svg").remove();

    this.setCanvas();

    this.draw(data, special, visualization);
  }

  //Actualiza el canvas ejecutando las animaciones
  update(data, special, mode, updateVisualization, visualization) {
    if (mode === "forward") {
      // updateVisualization(this.svg, mode, data, special);  <---DESCOMENTAR (ANIMACION)
      updateVisualization(this.svg, mode, data, special);

      //Se ejecuta la animacion para luego redibujar el canvas con los nuevos datos
      //provenientes del contextProvider
      setTimeout(() => {
        this.redraw(data, special, visualization);
      }, 500);
    } else if (mode === "backwards" || "reset") {
      this.redraw(data, special, visualization);
    }
  }
}

export default SVGCanvas;
