import React from "react";
import { Draggable } from "react-beautiful-dnd";



const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});

function DraggableWrapper(props) {
    const { draggableId, itemIndex } = props;
    return (
        <Draggable key={draggableId} draggableId={draggableId} index={itemIndex}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    {props.children}
                </div>
            )}
        </Draggable>
    );
}

export default DraggableWrapper;
