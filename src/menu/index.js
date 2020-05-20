import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { subscribe } from 'react-contextual';
import moment from 'moment';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PizzaCard from './pizzaCard';

import PizzaEditAndSave from './pizza_add_edit';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Menu = subscribe()(props=> {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 20
    },
    outer: {
      borderColor: 'grey',
      borderWidth: 2
    },
    table: {
      minWidth: 300,
    },
    itemName: {
  
      width: 50
    },
    itemSizeCell: {
      width: 50
    },
    orderBox: {
      paddingBottom: 30
    },
    button: {
      marginTop: 0
    },
    buttonInfo: {
      padding: 0,
      margin: 0
    },

    pizzaCard :{
      // backgroundColor: 'red',
      // borderWidth: 10,
      // borderColor: 'black',
      maxWidth: 300,
      minWidth: 300
    },

    photo : {
      backgroundColor: '#dddddd',
      height: 250
    }
  
  }));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openI = Boolean(anchorEl);
  const id = openI ? 'simple-popover' : undefined;

  const [edit, setEdit] = useState(true)
  const [open, setOpen] = React.useState(false);


  const [addPizza, setAddPizza] = useState(false);
  const [addSide, setAddSide] = useState(false);
  const [addDessert, setAddDessert] = useState(false);
  const [addDrink, setAddDrink] = useState(false);
  const [addDipping, setAddDipping] = useState(false);


  const { menu , loading } = props.restaurant;
  const { pizzas, sides, drinks, desserts, dippings } = menu;
  
  console.log("props ----", pizzas, 'loading', loading);
  return (
    <div style={{ padding: 20}}>
      <Grid container spacing={1} direction="column">
        <Grid item xs >
          <Card>

            <Grid  container direction="row" justify="space-between">
              <Typography color="textSecondary" variant="h3" gutterBottom>
                Pizzas 
              </Typography>
            </Grid>
           

          <Grid container direction="row" spacing={3} style={{ padding: 20, backgroundColor: '#f7f7f7'}}>
            
          {pizzas.length !== 0 && pizzas.map((item, index)=> (
              
            <Grid item xs={3} sm={2} className={classes.pizzaCard} key={index} > 
              <PizzaCard item={item}/>
            </Grid>

          ))}
            
          
                        {/* add new pizza  */}



              <Grid item xs={3} sm={2} className={classes.pizzaCard} >

                { !addPizza &&
                
                <Card style={{ height: 380, width: 250}}>
                  <CardContent>
                    <Grid container direction="row" justify="center" alignContent="center" alignItems="center" style={{ height: 350}}>
                      <Icon onClick={()=> setAddPizza(!addPizza)} fontSize="large" color="primary" style={{ alignSelf: 'center'}}>add_circle</Icon>
                    </Grid>
                  </CardContent>
                </Card>
                }
                { addPizza && 
                  <PizzaEditAndSave addPizza={addPizza} action={'add'} setAddPizza={setAddPizza} />
                }
              </Grid>

                      {/*  end of add new pizza  */}

    
            </Grid>
          </Card>
        </Grid>
       







        <Grid item xs>
          <Card>
         
            <Typography color="textSecondary" variant="h3" gutterBottom>
                Sides
            </Typography>


            <Grid container direction="row" spacing={3} style={{ padding: 20, backgroundColor: '#f7f7f7'}}>
              
              {sides.length !== 0 && sides.map((item, index)=> (
                  
                <Grid item xs={3} sm={2} className={classes.pizzaCard} key={index} > 
                  <PizzaCard item={item}/>
                </Grid>
    
              ))}
                
            
                          {/* add new pizza  */}
  
  
  
                <Grid item xs={3} sm={2} className={classes.pizzaCard} >
  
                  { !addSide &&
                  
                  <Card style={{ height: 380, width: 250}}>
                    <CardContent>
                      <Grid container direction="row" justify="center" alignContent="center" alignItems="center" style={{ height: 350}}>
                        <Icon onClick={()=> setAddSide(!addSide)} fontSize="large" color="primary" style={{ alignSelf: 'center'}}>add_circle</Icon>
                      </Grid>
                    </CardContent>
                  </Card>
                  }
                  { addSide && 
                    <PizzaEditAndSave addSide={addSide} action={'add'} setAddSide={setAddSide} />
                  }
                </Grid>
  
                        {/*  end of add new pizza  */}
  
      
            </Grid>
    
           
          </Card>
        </Grid>


        <Grid item xs>
          <Card>
            <CardContent>
              <Typography color="textSecondary" variant="h3" gutterBottom>
               Desserts 
              </Typography>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs>
          <Card>
            <CardContent>
            <Typography color="textSecondary" variant="h3" gutterBottom>
                Dippings
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs>
          <Card>
            <CardContent>
            <Typography color="textSecondary" variant="h3" gutterBottom>
               Drinks
              </Typography>
            </CardContent>
          </Card>
        </Grid>


      </Grid>
    </div>
  )
})


export default Menu;
