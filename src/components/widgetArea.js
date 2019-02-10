import React, { Component } from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import WidgetList from './WidgetList'
import {connect} from 'react-redux';
import {updateSelected} from '../actions/screensActions';

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

const grid = 10;
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class widgetArea extends Component {

    constructor(){
        super();
        this.state = {
            items: [],
            selected: [],
            screenName: 'No screen selected'
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.screen !== this.props.screen) {
            if(this.props.screen !== undefined) {
                this.setState({
                    items: this.props.screen.itemsWidgets,
                    selected: this.props.screen.selectedWidgets,
                    screenName: this.props.screen.name
                })
            }else {
                this.setState({
                    items: [],
                    selected: [],
                    screenName: 'No screen selected'
                })
            }
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

            const updateScreen = {
                id: this.props.screen.id,
                name: this.props.screen.name,
                itemsWidgets: result.droppable,
                selectedWidgets: result.droppable2
            }
            this.props.updateSelected(updateScreen);
        }
    };

  render() {
    return (
        <div className="row"> 
        <div className="col-sm-12"><h4>{this.state.screenName}</h4></div>
        <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                    <div 
                        className="col-md-8"
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        <WidgetList items={this.state.selected} />
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
};

const mapStateToProps = (state) => ({
    screens: state.screens.screens,
    screen: state.screens.screen
});
  
export default connect(mapStateToProps,{updateSelected})(widgetArea);

