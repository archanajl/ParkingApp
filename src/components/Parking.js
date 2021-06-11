import React from 'react'
import Header from './Header'
import ParkingSlots from './ParkingSlots'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import _ from 'lodash';

class Parking extends React.Component {
    constructor(props) {
        super(props);
        this.removeAllOptions = this.removeAllOptions.bind(this);
        this.addNewOption = this.addNewOption.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.removeAnOption = this.removeAnOption.bind(this);
        this.addNewFavorite = this.addNewFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.slotChanged = this.slotChanged.bind(this);
        this.state = {
            slots: [1, 5, 7, 15, 30],
            favorites: [],
            showNewCard: false
        }
    }


    slotChanged = (SourceIndex, DestinationIndex) => {
        const Myslots = [...this.state.slots]
        const Destinationslot = Myslots[DestinationIndex]
        Myslots.splice(DestinationIndex, 1, Myslots[SourceIndex])
        Myslots.splice(SourceIndex , 1, Destinationslot)
        this.setState({ slots: Myslots })
    }



    removeAllOptions() {
        this.setState(() => ({ slots: [] }))
    }

    removeAnOption(optionToRemove) {

        this.setState((prevState) => ({
            slots: prevState.slots.filter((slot) => {
                return optionToRemove !== slot;
            })
        }))

    }

    removeFavorite(favoriteToRemove) {

        this.setState((prevState) => ({
            favorites: prevState.favorites.filter((favorite) => {
                return favoriteToRemove !== favorite;
            })
        }))

    }


    addNewOption(slot) {
        slot = Number(slot)
        if (!slot || slot === 0) {
            return 'Enter a valid slot';
        }
        else if (this.state.slots.indexOf(slot) > -1) {
            return 'This slot already exists';
        }
        const sortSlots = this.state.slots
        sortSlots.splice(_.sortedIndex(sortSlots, slot), 0, slot)
        this.setState((prevState) => ({
            slots: sortSlots,
            favorites: prevState.favorites.concat(slot),
            showNewCard: !prevState.showNewCard
        }))

    }

    addNewFavorite(favorite) {
        if (!favorite) {
            return 'Enter a valid slot';
        }
        else if (this.state.favorites.indexOf(favorite) > -1) {
            return 'This favorite is already set';
        }
        this.setState((prevState) => ({ favorites: prevState.favorites.concat(favorite) }))
    }

    addNewCard() {
        this.setState((prevState) => ({ showNewCard: !prevState.showNewCard }))
    }


    render() {
        const { favorites, slots, showNewCard } = this.state
        return (
            <div>
                <Header title='Parking' subtitle='Planning Period' />
                <Card>
                    <CardContent>
                        <ParkingSlots
                            handleNewOption={this.addNewOption}
                            handleDelete={this.removeAllOptions}
                            handleDeleteAnOption={this.removeAnOption}
                            handleFavDelete={this.removeFavorite}
                            handleAddFavorite={this.addNewFavorite}
                            addNewCard={this.addNewCard}
                            slotChanged={this.slotChanged}
                            favorites={favorites}
                            slots={slots}
                            showNewCard={showNewCard}
                        />
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Parking.defaultProps = {
    slots: [1, 5, 7, 30],
    favorites: [],
    showNewCard: false
}


export default Parking

