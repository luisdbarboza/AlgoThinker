import React, { useEffect, useState, useCallback } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import listOfAlgorithms from "../../algorithms/algorithms";

const CodeEditor = ({ lessonData }) => {
  let { type, lesson } = lessonData;
  lesson = lesson.toLowerCase();
  type = type.toLowerCase();

  const [text, setEditor] = useState("");

  let fetchCode = useCallback(async () => {
    let path = listOfAlgorithms[type][lesson].code;
    let promise = await fetch(path);

    
    let data = await promise.text();
    
    return data;
  }, [lesson, type]);

  useEffect(() => {
    fetchCode().then((text) => {
      setEditor((prevState) => text);
    });
  }, []);

  return (
    <>
      <AceEditor
        mode="javascript"
        width="100%"
        height="100%"
        theme="monokai"
        placeholder="Escriba su codigo aqui..."
        value={text}
      />
    </>
  );
};

export default CodeEditor;
