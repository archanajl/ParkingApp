import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';




export default function ParkingCard(props) {

    const handleAddFavorite = () =>{
        if (!props.favorites.includes(props.slot)){
            props.handleAddFavorite(props.slot)
        }
        else{
            props.handleFavDelete(props.slot)
        }
    }
  
  return (

    <Card>
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={(e) => {handleAddFavorite()}}>
           {(!props.favorites.includes(props.slot)) && <StarOutlineIcon fontSize="large"/> }
           {(props.favorites.includes(props.slot)) && <StarIcon style={{ fill: "green" , fontSize:"large"}}/> } 
    
        </IconButton>
        <IconButton aria-label="remove" slot='10' onClick={(e) => {props.handleDeleteAnOption(props.slot)}}>
            {(!props.favorites.includes(props.slot)) && <RemoveCircleIcon style={{ fill: "red" , fontSize:"large"}}/> }
        </IconButton>
      </CardActions>
      
      <CardContent>
        <Typography variant="h1" color="textSecondary" component="p">
          {props.slot}
        </Typography>
        
        
        <Typography variant="body2" color="textSecondary" component="p">
        {props.slot === 1 ? 'day' : 'days'}
        </Typography>

      </CardContent>
      
      
    </Card>

  );
}
