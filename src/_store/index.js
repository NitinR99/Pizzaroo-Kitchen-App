import * as actions from './actions';

export default {
  restaurant: {
    storeId: '',
    description:'',
    firstName: '',
    lastName: '',
    storeName: '',
    phone: '',
    email: '',
    password: '',
    repeatPassword: '',
    website: '',
    address: '',
    street: '',
    province:'',
    city: '',
    postalCode: '',
    state: '', 
    country: '',
    registrationCode: '',
    loading: true,
    loggedIn: false,
    menu: '',
    hour: {
      open: '',
      close: ''
    },
  },
  menu: {

  },
  orders: {
    loading: true,
  },
  ...actions
}
