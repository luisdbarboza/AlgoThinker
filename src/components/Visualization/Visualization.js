import React, { useState, useRef, useEffect, useContext } from "react";
import { VisualizationContext } from "../../context/visualizationContext";
import listOfAlgorithms from "../../algorithms/algorithms";
import {
  GoBackIcon,
  PlayIcon,
  PauseIcon,
  ResetIcon,
  GoForwardIcon,
} from "../Icons";
import D3SVGCanvas from "../../classes/D3SVGCanvas";
import classes from "./Visualization.module.scss";

//Uff, aqui empieza lo bueno

const GoBackButton = () => {
  //Boton para ir hacia atras
  const { visualizationState, dispatchVisualization } = useContext(
    VisualizationContext
  );
  const { stateHistory } = visualizationState;

  return (
    <button
      onClick={() => executePartially("backwards", dispatchVisualization)}
      disabled={stateHistory && stateHistory.length > 1 ? false : true}
    >
      <GoBackIcon />
    </button>
  );
};

const PlayStopResetButton = () => {
  //Boton para reproducir/pausar/reiniciar la visualizacion
  const { visualizationState, dispatchVisualization } = useContext(
    VisualizationContext
  );
  const { fullExecution, specialData: special } = visualizationState;

  return (
    <button
      onClick={() => {
        if (fullExecution && special.restante === 0) {
          resetVisualization(dispatchVisualization);
        } else {
          executeFully(dispatchVisualization);
        }
      }}
    >
      {!fullExecution ? (
        <PlayIcon />
      ) : fullExecution && special.restante > 0 ? (
        <PauseIcon />
      ) : (
        <ResetIcon />
      )}
    </button>
  );
};

const GoForwardButton = () => {
  //Boton ir hacia delante
  const { visualizationState, dispatchVisualization } = useContext(
    VisualizationContext
  );
  const { specialData: special } = visualizationState;

  //desactiva el boton si no quedan pasos por ejecutar
  return (
    <button
      onClick={() => executePartially("forward", dispatchVisualization)}
      disabled={special && special.restante === 0 ? true : false}
    >
      <GoForwardIcon />
    </button>
  );
};

const executeFully = (dispatchVisualization) => {
  dispatchVisualization({
    type: "EXECUTE_FULLY",
  });
};

const executePartially = (mode, dispatchVisualization) => {
  dispatchVisualization({
    type: "EXECUTE_STEP",
    mode,
  });
};

const resetVisualization = (dispatchVisualization) => {
  dispatchVisualization({
    type: "RESET_VISUALIZATION",
  });
};

const VisualizationControls = () => {
  const { visualizationState, dispatchVisualization } = useContext(
    VisualizationContext
  );
  const {
    fullExecution,
    specialData: special,
    stateHistory,
  } = visualizationState;
  const timeoutID = useRef(null);

  //Ejecuta la visualizacion al completo, paso por paso cada 0.5 segundos
  //Si y solo si fullExecution es true y todavia quedan pasos por ejecutar
  useEffect(() => {
    if (fullExecution && special.restante > 0) {
      timeoutID.current = setTimeout(() => {
        executePartially("forward", dispatchVisualization);
      }, 500);
    } else if (!fullExecution) {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current);
      }
    }
  }, [fullExecution, stateHistory.length]);

  return (
    <div className={classes.visualizationControls}>
      <GoBackButton stateHistory={stateHistory} />
      <PlayStopResetButton />
      <GoForwardButton special={special} />
    </div>
  );
};

//La caja negra entre react y d3... la division de sus mundos
//React suministra los datos a un contenedor del que tiene una
//referencia
const SVGCanvas = () => {
  let svgWrapper = useRef();
  const { visualizationState } = useContext(VisualizationContext);
  const {
    current: data,
    specialData: special,
    visualization,
    updateVisualization,
    mode,
  } = visualizationState;
  const [canvas, setCanvas] = useState(null);

  const createCanvas = () => {
    setCanvas(new D3SVGCanvas(svgWrapper, "100%", "100%"));
  };

  //Dibuja cosas en el lienzo SVG o refresca el canvas si
  //este ya tiene algo dentro
  const drawAndRedrawData = () => {
    if (data && canvas && !canvas.hasData) {
      canvas.draw(data, special, visualization);
    } else if (data && canvas && canvas.hasData) {
      canvas.update(data, special, mode, updateVisualization, visualization);
    }
  };

  useEffect(createCanvas, []);

  useEffect(drawAndRedrawData, [data, special, canvas]);

  return (
    <div
      ref={svgWrapper}
      id="svg-canvas-wrapper"
      className={classes.svgCanvasWrapper}
    ></div>
  );
};

const Visualization = ({ lessonData }) => {
  const { dispatchVisualization } = useContext(VisualizationContext);
  let { lesson, type, special } = lessonData;
  lesson = lesson.toLowerCase();
  type = type.toLowerCase();

  const data = [44, 9, 6, 2, 5, 63, 87, 1];

  useEffect(() => {
    dispatchVisualization({
      type: "SET_VISUALIZATION",
      currentState: data,
      specialData: special,
      algorithm: listOfAlgorithms[type][lesson].algorithm,
      code: listOfAlgorithms[type][lesson].code,
      visualization: listOfAlgorithms[type][lesson].visualize,
      updateVisualization: listOfAlgorithms[type][lesson].updateCanvas,
    });
  }, []);

  return (
    <div className={classes.visualizationWrapper}>
      <SVGCanvas />
      <VisualizationControls dispatchVisualization={dispatchVisualization} />
    </div>
  );
};

export default Visualization;
