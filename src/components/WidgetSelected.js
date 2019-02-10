import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});

export default class widgetSelected extends Component {
  render() {
    return (
      <div>
        {this.props.selected.map((selected, index) => (
            <Draggable
                key={selected.id}
                draggableId={selected.id}
                index={index}>
                {(provided, snapshot) => (
                    <div  className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}>
                        {selected.content}
                    </div>
                )}
            </Draggable>
        ))}
      </div>
    )
  }
}
