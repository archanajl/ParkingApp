import React from 'react';
import ParkingSlot from './ParkingSlot'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ParkingNewCard from './ParkingNewCard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ParkingSlots extends React.Component{

    componentDidUpdate(){
        <ReactCSSTransitionGroup component={ParkingSlot}
                                transitionName="fade"
                                transitionEnterTimeout={100}
                                transitionLeaveTimeout={100}>
         </ReactCSSTransitionGroup>                            
    }
   

    render(){
     return(
            <div className="container">  
                {this.props.slots.length === 0 && <p className = "widget__message">Please add a slot to get started !!</p>}
                <div className="grid-container">
                    {this.props.slots.map((slot,index) => 
                        <div className="grid-item">
                            <ParkingSlot 
                                handleDeleteAnOption={this.props.handleDeleteAnOption} 
                                handleFavDelete = {this.props.handleFavDelete}
                                handleAddFavorite = {this.props.handleAddFavorite}
                                key={index + 1} 
                                index={index + 1} 
                                slot={slot}
                                favorites={this.props.favorites}
                            >
                            </ParkingSlot>
                        </div>
                    )}
                    <div className="new-grid-item grid-item">
                        {this.props.showNewCard && <ParkingNewCard handleNewOption = {this.props.handleNewOption}/>}
                        {!this.props.showNewCard && <AddCircleIcon style={{fill: "green"}} onClick={(e) => {this.props.addNewCard()}}/>}
                    </div>
                </div>
            </div>
    )
}
}
