import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import OrdersNav from "../app/layout/ordersNav";
import { navigate } from 'hookrouter';
import { subscribe } from 'react-contextual';
import moment from 'moment';

import { updateOrder } from '../api';
import firebase from '../firebase';
// customerName: props.user.name,
// customerPhone: props.user.phone,
// customerEmail: props.user.email,
// items,
// address,
// instruction,
// payment,
// storeId: store.id,
// store,
// numberOfItems,
// total: total(items)
const convertDate = (time) => moment(time,'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LLL');
var count = 1;
var rows = [];
var rowsIncoming = [
  createData(count, 2, "11am"),
  createData(++count, 2, "11.15am"),
  createData(++count, 2, "11.20am"),
  createData(++count, 2, "11.25am"),
  createData(++count, 2, "11.30am"),
  createData(++count, 2, "11.15am"),
  createData(++count, 2, "11.20am"),
  createData(++count, 2, "11.25am"),
  createData(++count, 2, "11.30am"),
];
var rowsPrep = [];
var rowsCompleted = [];

const Orders = subscribe()((props) =>  {


  console.log("today",moment().format('MMMM-Do-YYYY'));
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = useStyles();

  const { loading } = props.orders;

  // new work

  // get all the orders from firestore
  const fetchData =  async ()=>{
    try {
      await firebase.firestore()
        .collection('orders')
        .where('status', '==', 'open')
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
          if (change.type === 'modified') {
            console.log("changed----", change.doc.data());
            // props.updateOrders({ incomings: change.doc.data(), loading: false})
          }
        })
      })
  } catch (err) {
    console.log("error", err);
  }}
  useEffect(() => {
    props.getCustomerOrders();
    fetchData();
  }, [props.getCustomerOrders])

  const { incomings } = props.orders;
  const list = {
    hi: [1,2,3],
    hello: [3,4,5]
  }
  
  console.log("incomings", props.orders);

  const onRejectOrder = async (pushId) => {
    await updateOrder(pushId,'confirmed', 'closed');
  }

  const onAcceptOrder = async (pushId) => {
    console.log("accept the order")
    await updateOrder(pushId,'confirmed', 'open');
  }

  const onPrepareOrder = async (pushId) => {
    await updateOrder(pushId, 'preparing', 'open');
  }

  const onCompleteOrder = async (pushId) => {
    await updateOrder(pushId, 'enroute', 'open');
  }
  return (
    <div className={classes.root}>
      <div>
        <OrdersNav />
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Container maxWidth="lg" style={{ marginTop: 20 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" variant="h4" gutterBottom>
                    Incoming Orders
                  </Typography>
                  <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                  <div>
                  {!loading && incomings && incomings.length !== 0 && incomings.sort((a,b)=> a.createdAt < b.createdAt).map((order,index) => {

                    if(order.progressStep === 'waiting'){
                      return(
                        <Card
                      key={index}
                      style={{ marginBottom: 10 }}
                    >
                      <CardContent>
                        <Typography color="textSecondary" >
                          Order #{order.id}
                        </Typography>
                        <Typography color="textSecondary">
                          Ordered At: {convertDate(order.createdAt)}
                        </Typography>
                        <Typography color="textSecondary">
                          Customer: {order.customerName}
                        </Typography>
                        <Typography color="textSecondary">
                          Email: {order.customerEmail}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Phone: {order.customerPhone}
                        </Typography>
                        <Typography color="textSecondary">
                          Payment: {order.payment}
                        </Typography>
                        <Typography color="textSecondary">
                          Status: {order.status}
                        </Typography>
                        <Typography color="textSecondary">
                          Number of Item: {order.numberOfItems}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Total: {order.total.toFixed(2)}
                        </Typography>
                        <Typography color="textSecondary">
                          Delivery Instruction: {order.instruction? order.instruction : "N/A"}
                        </Typography>


                        <Typography color="textSecondary">
                          Address: { `${order.address.apt? " " : "Apt/Unit: " + order.address.apt}`  + " " + order.address.street +" "+ order.address.city+ " " + order.address.postalCode }
                        </Typography>
                     

                          <div>
                          <Typography variant="body2" component="p">
                            { order.items && Object.keys(order.items).map((typeOfFood, i)=>(
                              <div key={i}>
                              {order.items[typeOfFood].map((anItem, ii ) => (
                                <div key={ii}>
                                  <TableRow key={ii}>
                                      <TableCell>
                                        <Typography variant="h6">
                                        {anItem.quantity} x {anItem.name}
                                        </Typography>
                                      </TableCell>

                                      <TableCell align="right">
                                        <Typography >
                                          {anItem.instruction}
                                        </Typography>
                                      </TableCell>

                                      <TableCell align="right">
                                        <Typography >
                                          ${anItem.price}
                                        </Typography>
                                      </TableCell>
                                    </TableRow>
                                </div>
                                  
                                ))} 
                        
                              </div>

                            ))}

                          </Typography>
                          </div>
                         
                        </CardContent>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            onRejectOrder(order.id)
                          }}
                        >
                          <Typography variant="h6">Contact Customer to Reject</Typography>
                        </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            onAcceptOrder(order.id)
                          }}
                        >
                          <Typography variant="h6">Accept</Typography>
                        </Button>
                      </Card>
                      )
                    }
                  })}
                  </div>
                </CardContent>
              </Card>
            </Container>
          </Grid>
          <Grid item xs={8}>
            <Container maxWidth="lg" style={{ marginTop: 20 }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        variant="h4"
                        gutterBottom
                      >
                        Pending Orders
                      </Typography>
                      <Typography variant="h5">5</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        variant="h4"
                        gutterBottom
                      >
                        Preparing Orders
                      </Typography>
                      <Typography variant="h5">2</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        variant="h4"
                        gutterBottom
                      >
                        Completed Orders
                      </Typography>
                      <Typography variant="h5">8</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Divider style={{ marginTop: 25, marginBottom: 25 }} />

              <ExpansionPanel square onChange={handleChange("panel1")}>
                <ExpansionPanelSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography variant="h4">Preparing Orders</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    <TableContainer component={Paper}>
                      <Table
                        aria-label="collapsible table"
                        style={{ width: 800 }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell>
                              <Typography variant="h5">Order Number</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="h5">No. of Items</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="h5">
                                Time of order
                              </Typography>
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowsPrep.map((rowsPrep,indexRow) => (
                            <RowTwo key={indexRow} row={rowsPrep} />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel square onChange={handleChange("panel2")}>
                <ExpansionPanelSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography variant="h4">Pending Orders</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    <TableContainer component={Paper}>
                      <Table
                        aria-label="collapsible table"
                        style={{ width: 800 }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell>
                              <Typography variant="h5">Order Number</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="h5">No. of Items</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="h5">
                                Time of order
                              </Typography>
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <Row key={row.orderId} row={row} />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel square onChange={handleChange("panel3")}>
                <ExpansionPanelSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography variant="h4">Completed Orders</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    <TableContainer component={Paper}>
                      <Table
                        aria-label="collapsible table"
                        style={{ width: 800 }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell>
                              <Typography variant="h5">Order Number</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="h5">No. of Items</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="h5">
                                Time of order
                              </Typography>
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowsCompleted.map((row) => (
                            <RowThree key={row.orderId} row={row} />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Container>
          </Grid>
        </Grid>
      </div>
    </div>
  );
});


export default Orders;

function createData(orderId, totalQuantity, timeOfOrder, carbs) {
  return {
    orderId,
    totalQuantity,
    timeOfOrder,
    history: [
      {
        itemId: "1",
        itemName: "Cheese pizza (XL)",
        amount: 3,
        instruction: "Well done This is lomg instruction,then what will happen to the div",
        price: 12.2,
      },
      {
        itemId: "2",
        itemName: "Pepperoni pizza (L)",
        amount: 1,
        instruction: "Easy on the cheese please",
        price: 14.5,
      },
    ],
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="left">
          <Typography variant="h6">{row.orderId}</Typography>
        </TableCell>

        <TableCell align="right">
          <Typography variant="h6">{row.totalQuantity}</Typography>
        </TableCell>

        <TableCell align="right">
          <Typography variant="h6">{row.timeOfOrder}</Typography>
        </TableCell>

        <TableCell align="right">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              rowsPrep.push(row);
              rows.splice(rows.indexOf(row), 1);
            }}
          >
            <Typography variant="h6">Being prepared</Typography>
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div">
                Order details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h5">ID</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h5">Item</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h5">Quantity</Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="h5">Special instructions</Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="h5">Total price ($)</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={historyRow.itemId}>
                      <TableCell component="th" scope="row">
                        <Typography variant="h5">
                          {historyRow.itemId}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="h5">
                          {historyRow.itemName}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="h5">
                          {historyRow.amount}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="h5">
                          {historyRow.instruction}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="h5">
                          {(historyRow.amount * historyRow.price).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
function RowTwo(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="left">
          <Typography variant="h6">{row.orderId}</Typography>
        </TableCell>

        <TableCell align="right">
          <Typography variant="h6">{row.totalQuantity}</Typography>
        </TableCell>

        <TableCell align="right">
          <Typography variant="h6">{row.timeOfOrder}</Typography>
        </TableCell>

        <TableCell align="right">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              rows.push(row);
              rowsPrep.splice(rowsPrep.indexOf(row), 1);
            }}
          >
            <Typography variant="h6">Still pending</Typography>
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              rowsCompleted.push(row);
              rowsPrep.splice(rowsPrep.indexOf(row), 1);
            }}
          >
            <Typography variant="h6">Completed</Typography>
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div">
                Order details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h5">ID</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h5">Item</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h5">Quantity</Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="h5">Special instructions</Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="h5">Total price ($)</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.itemId}>
                      <TableCell component="th" scope="row">
                        <Typography variant="h5">
                          {historyRow.itemId}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="h5">
                          {historyRow.itemName}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="h5">
                          {historyRow.amount}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="h5">
                          {historyRow.instruction}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="h5">
                          {(historyRow.amount * historyRow.price).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
function RowThree(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="left">
          <Typography variant="h6">{row.orderId}</Typography>
        </TableCell>

        <TableCell align="right">
          <Typography variant="h6">{row.totalQuantity}</Typography>
        </TableCell>

        <TableCell align="right">
          <Typography variant="h6">{row.timeOfOrder}</Typography>
        </TableCell>

        <TableCell align="right">
          <Button variant="contained" disabled>
            <Typography variant="h6">Out the door</Typography>
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div">
                Order details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h5">ID</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h5">Item</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h5">Quantity</Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="h5">Special instructions</Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="h5">Total price ($)</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.itemId}>
                      <TableCell component="th" scope="row">
                        <Typography variant="h5">
                          {historyRow.itemId}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="h5">
                          {historyRow.itemName}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="h5">
                          {historyRow.amount}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="h5">
                          {historyRow.instruction}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="h5">
                          {(historyRow.amount * historyRow.price).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
