import React, { useState} from 'react';

import { subscribe } from "react-contextual";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fade from '@material-ui/core/Fade';
import Icon from '@material-ui/core/Icon';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Backdrop from '@material-ui/core/Backdrop';
const TransitionsModal = ({ open, setOpen}) => {

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

  const classes = useStyles();

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h5 id="transition-modal-title">Are you sure to remove this item?</h5>
            <Grid
              style={{ marginTop: 30}}
              justify="space-between"
              container
             >
                <Button
                  variant="outlined"
                  color="secondary"
                >
                  Yes
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={()=>handleClose()}
                >
                  No
                </Button>
            </Grid>
     
          </div>
        </Fade>
      </Modal>
    </div>
  );
}



const Pizza = subscribe()(props=>{


  const { item } = props;

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false); 

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openI = Boolean(anchorEl);
  const id = openI ? 'simple-popover' : undefined;


  return (
    <Card >
    <CardActionArea>
      <CardMedia
        style={{ backgroundColor: '#dddddd', height: 250}}
        image={require('./restaurant.jpg')}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h3">
          {item.name}
        </Typography>
        <p style={{fontSize: 12, color: 'grey' }}>
          {item.description}
        </p>

        {/* --------- price coloum grid ---------- */}
        <Grid container direction="column">
          { item.sizes.length !== 0 && item.sizes.sort((a,b)=> a.price < b.price).map((size,indexSize)=>(
            <Grid item xs key={indexSize}>
              <Grid  container direction="row" justify="space-between">
                <Grid item >
                  <p>
                    {size.size}
                  </p>
                </Grid>
                <Grid item >
                  <p>
                    ${size.price}
                  </p>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
       
      </CardContent>
    </CardActionArea>

    <CardActions>
      <Grid container direction="row" justify="space-between">
        <Button size="small" color="primary" onClick={() => setEdit(!edit)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() =>setOpen(!open) }>
          Remove
        </Button>

      </Grid>
     <TransitionsModal  edit={edit} setEdit={setEdit} open={open} setOpen={setOpen}/>
    </CardActions>
  </Card>
  )
})

export default Pizza;
