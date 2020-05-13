import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { LinkContainer } from "react-router-bootstrap";
import { navigate } from 'hookrouter';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: "#FBFF12",
    color: "#2D2A32",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <LinkContainer to="/">
            <Typography variant="h4" className={classes.title}>
              Pizzaroo
            </Typography>
          </LinkContainer>
          <div onClick={() => navigate('/dashboard')}>
            <Button 
              variant="contained" 
              color="primary"
              >
              <Typography variant="h6">Orders</Typography>
            </Button>
          </div>
          <div onClick={() => navigate('/signup')}>
          <Button 
            variant="contained" 
            color="primary"
            // onClick={navigate('/signup')}
             >
            <Typography variant="h6">Signup</Typography>
          </Button>
          </div>
          <div onClick={() => navigate('/login')}>
          <Button 
            variant="contained" 
            color="primary"
            // onClick={()=>navigate('/login')}
            >
            <Typography variant="h6">Login</Typography>
          </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
