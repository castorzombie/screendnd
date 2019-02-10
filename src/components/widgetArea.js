import React, { Component } from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import WidgetList from './WidgetList'
import WidgetSelected from './WidgetSelected'
import {connect} from 'react-redux';

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `widget ${k + offset}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class widgetArea extends Component {
    state = {
        items: getItems(10),
        selected: getItems(0, 10)
    };

    componentDidUpdate(prevProps) {
        console.log(this.props.screen)
        if (prevProps.screen !== this.props.screen) {
            this.setState({
                selected: getItems(this.props.screen.selectedWidegts, 10)
            })
        }
    }

    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };
            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }
            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

  render() {
    console.log(this.state.items)
    console.log(this.state.selected)
    return (
        <div className="row"> 
        <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                    <div 
                        className="col-md-8"
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        <WidgetSelected selected={this.state.selected} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div 
                        className="col-md-4"
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        <WidgetList items={this.state.items} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
    screen: state.screens.screen
  })
  
  export default connect(mapStateToProps) (widgetArea)

