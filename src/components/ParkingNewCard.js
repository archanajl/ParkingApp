import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';    
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

let slotValue = 0;


export default function ParkingNewCard(props) {
  
    const addNewOption = (slot) => {
        props.handleNewOption(slotValue)
        slotValue = 0;
    }

  return (
    <Card style={{height: "150px", width: "100px"}} onClick={(e) => {addNewOption(slotValue)}}>
      <CardContent>
        <TextareaAutosize aria-label="empty textarea" 
            rowsMin={1} 
            rowsMax={1}
            style={{height: "50px", width: "50px", textAlign: "center", alignContent: "center"}}
            placeholder={props.slot} 
            onChange={(e) => {slotValue = e.target.value}}/>
        <Typography variant="body2" color="textSecondary" component="p">
          days
        </Typography>
      </CardContent>
    </Card>
  )
}
