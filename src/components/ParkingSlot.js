import React from 'react';
import ParkingCard from './ParkingCard'


const ParkingSlot = (props) =>(
        <div className="option">
            <ParkingCard 
                slot={props.slot} 
                handleDeleteAnOption={props.handleDeleteAnOption}
                handleFavDelete = {props.handleFavDelete}
                handleAddFavorite = {props.handleAddFavorite}
                favorites={props.favorites}
            ></ParkingCard>
        </div>
    )


export default ParkingSlot