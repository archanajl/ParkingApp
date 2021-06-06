import React from 'react'
import Header from './Header'
import ParkingSlots from './ParkingSlots'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';

class Parking extends React.Component{
    constructor(props){
        super(props);
        this.removeAllOptions = this.removeAllOptions.bind(this);
        this.addNewOption = this.addNewOption.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.removeAnOption = this.removeAnOption.bind(this);
        this.addNewFavorite = this.addNewFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.state = {
            slots :[1,5,7,15,30],
            favorites: [],
            showNewCard : false
        }
    }
    
    componentDidMount(){
        const jsonSlots = localStorage.getItem('slots');
        const slots = JSON.parse(jsonSlots);
        const jsonFavorites = localStorage.getItem('favorites');
        const favorites = JSON.parse(jsonFavorites);
        const showNewCard = localStorage.getItem('showNewCard')
        if (slots){
            this.setState(()=>({slots,favorites,showNewCard}))
        }
      
    }

    componentDidUpdate(prevState){
        if( prevState.slots.length !== this.state.slots.length){
            const json = JSON.stringify(this.state.slots);
            localStorage.setItem('slots',json);
        }
        if( prevState.favorites.length !== this.state.favorites.length){
            const json = JSON.stringify(this.state.favorites);
            localStorage.setItem('favorites',json);
        }
        if( prevState.showNewCard !== this.state.showNewCard){
            localStorage.setItem('showNewCard',this.state.showNewCard);
        }
    }   

    removeAllOptions(){
        this.setState(() => ({slots :[]}))
    }

    removeAnOption(optionToRemove){
     
        this.setState((prevState)=>({
            slots: prevState.slots.filter((slot) => {
                return optionToRemove !== slot;
                }) 
            }))
        
    }

    removeFavorite(favoriteToRemove){
     
        this.setState((prevState)=>({
            favorites: prevState.favorites.filter((favorite) => {
                return favoriteToRemove !== favorite;
                }) 
            }))
        
    }


    addNewOption(slot){
        slot = Number(slot)
        if (!slot || slot === 0 ){
            return 'Enter a valid slot';
        }
        else if (this.state.slots.indexOf(slot) > -1 ){
            return 'This slot already exists';
        }
        const sortSlots = this.state.slots
        sortSlots.splice(_.sortedIndex(sortSlots,slot) ,0,slot)
        this.setState((prevState) =>  ({slots : sortSlots,
                                        favorites : prevState.favorites.concat(slot), 
                                        showNewCard : !prevState.showNewCard}))
        
    }

    addNewFavorite(favorite){
        
        if (!favorite){
            return 'Enter a valid slot';
        }
        else if (this.state.favorites.indexOf(favorite) > -1 ){
            return 'This favorite is already set';
        }

        this.setState((prevState) =>  ({favorites : prevState.favorites.concat(favorite)}))
        
    }

    addNewCard(){
        
        this.setState((prevState) =>  ({showNewCard : !prevState.showNewCard}))
        
    }


    render(){
        const title =  'Parking';
        const subtitle =  'Planning Period';
    
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Card>
                    <CardContent>
                        <ParkingSlots 
                        handleNewOption={this.addNewOption} 
                        handleDelete={this.removeAllOptions}
                        handleDeleteAnOption={this.removeAnOption} 
                        handleFavDelete = {this.removeFavorite}
                        handleAddFavorite = {this.addNewFavorite}
                        addNewCard = {this.addNewCard}
                        favorites={this.state.favorites}
                        slots ={this.state.slots}
                        showNewCard = {this.state.showNewCard}
                        />
                    
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Parking.defaultProps = {
    slots : [1,5,7,30],
    favorites : [],
    showNewCard : false
}


export default Parking

