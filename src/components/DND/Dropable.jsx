import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightgray" : "white",
});

function DropableView(props) {
    const { onDragEnd } = props;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >   
                        {props.children}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DropableView;
