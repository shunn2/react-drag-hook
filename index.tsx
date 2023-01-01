import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import DragNDrop from "./DragDrop";
import "./section.css";

let data = {
  title: "project1",
  main: {
    /**
     * key랑 id는 같아야 함.
     * x, y는 부모 기준으로 얼마나 떨어져 있는 지.
     */
    1: {
      id: 1,
      parentId: 2,
      type: "block",
      tag: "div",
      style: {
        fontSize: "10px",
        color: "red",
      },
      content: "text example",
      class: {
        flex: true,
      },
      image: null,
      x: 0,
      y: 0,
    },
    2: {
      id: 2,
      parentId: null,
      type: "block",
      tag: "img",
      style: {
        fontSize: "10px",
        color: "red",
      },
      content: null,
      image: "https;dfslkdfjlsdkjflsdkjf",
      x: 0,
      y: 0,
    },
  },
};

interface Data {
  title: string;
  items: string[];
}

const defaultData = [
  { title: "group 1", items: ["1", "2", "3"] },
  { title: "group 2", items: ["4", "5"] },
];

const SectionDrag = () => {
  const [data, setData] = useState<Data[]>();
  useEffect(() => {
    if (localStorage.getItem("List")) {
      setData(JSON.parse(localStorage.getItem("List") || "{}"));
    } else {
      setData(defaultData);
    }
  }, [setData]);

  const handleSort = ({ index }: { index: number }) => {
    if (
      document
        .getElementById(`section_${index}`)
        .classList.contains("justify_center")
    ) {
      document
        .getElementById(`section_${index}`)
        .classList.remove("justify_center");
    } else {
      document
        .getElementById(`section_${index}`)
        .classList.add("justify_center");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={data} />
        <button onClick={(e) => handleSort({ index: 0 })}>sort1</button>
        <button onClick={(e) => handleSort({ index: 1 })}>sort2</button>
      </header>
    </div>
  );
};

export default SectionDrag;

//https://froala.com/wysiwyg-editor/examples/website-builder/
/**
 * flex로 할거면 굳이 x, y가 필요할려나
 */

/**
 * class 관련 https://hianna.tistory.com/469
 */
/**
 * iframe을 쓰는 이유 => px을 못맞춤
 */
