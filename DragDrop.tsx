import React, { useState, useRef, useEffect } from "react";
import "./section.css";

function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setList(data);
  }, [data]);

  const dragItem = useRef<any>();
  const dragItemNode = useRef<any>();

  const handletDragStart = (e, item) => {
    dragItem.current = item;
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e, targetItem) => {
    const currentItem = dragItem.current;
    if (dragItemNode.current !== e.target) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.grpI].items.splice(
          targetItem.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = targetItem;
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragItemNode.current = null;
  };
  const getStyles = (item) => {
    const currentItem = dragItem.current;

    if (currentItem.grpI === item.grpI && currentItem.itemI === item.itemI) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  if (list) {
    return (
      <div className="drag-n-drop">
        {list.map((grp, grpI) => (
          <div
            id={`section_${grpI}`}
            key={grp.title}
            onDragEnter={
              dragging && !grp.items.length
                ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                : null
            }
            className="dnd-group"
          >
            {grp.items.map((item, itemI) => (
              <div
                draggable
                key={item}
                onDragStart={(e) => handletDragStart(e, { grpI, itemI })}
                onDragEnter={
                  dragging
                    ? (e) => {
                        handleDragEnter(e, { grpI, itemI });
                      }
                    : null
                }
                className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default DragNDrop;
