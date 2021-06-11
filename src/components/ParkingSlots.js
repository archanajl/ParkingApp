import React from 'react';
import ParkingSlot from './ParkingSlot'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ParkingNewCard from './ParkingNewCard';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class ParkingSlots extends React.Component {

    onDragEnd = result => {
        // TODO: reorder our column
    };

    render() {
        const { slotChanged } = this.props
        return (
            <div className="container">
                {this.props.slots.length === 0 && <p className="widget__message">Please add a slot to get started !!</p>}
                <DragDropContext
                    onDragEnd={(result) => { slotChanged(result.source.index - 1, result.destination.index - 1)}}>
                    <Droppable droppableId='ParkingSlots' direction="horizontal">
                        {(provided) => (<div className="grid-container" {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {this.props.slots.map((slot, iterator) => (
                                <Draggable
                                    draggableId={`parking_${iterator}`}
                                    key={iterator + 1}
                                    index={iterator + 1}>
                                    {(nestedprovided) => (
                                        <div className="grid-item"
                                            {...nestedprovided.draggableProps}
                                            {...nestedprovided.dragHandleProps}
                                            ref={nestedprovided.innerRef}
                                        >
                                            <ParkingSlot
                                                handleDeleteAnOption={this.props.handleDeleteAnOption}
                                                handleFavDelete={this.props.handleFavDelete}
                                                handleAddFavorite={this.props.handleAddFavorite}
                                                key={iterator + 1}
                                                index={iterator + 1}
                                                slot={slot}
                                                favorites={this.props.favorites}
                                            >
                                            </ParkingSlot>
                                        </div>)}
                                </Draggable>))}
                            <div className="new-grid-item grid-item">
                                {this.props.showNewCard && <ParkingNewCard handleNewOption={this.props.handleNewOption} />}
                                {!this.props.showNewCard && <AddCircleIcon style={{ fill: "green" }} onClick={(e) => { this.props.addNewCard() }} />}
                            </div>
                        </div>)}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}
