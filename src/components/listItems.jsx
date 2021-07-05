import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import {Link} from 'react-router-dom';

export const mainListItems = (
  // console.log();
  // // useEffect =>runs a piece of code base on specific condition
  // useEffect(() => {
  //   db.collection('ss').onSnapshot(snapshot => {
  //     console.log(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})));
  //   });
  // }, []);
  <div>
    <Link to='/stores'>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Stores' />
      </ListItem>
    </Link>

    <Link to='create-store'>
      <ListItem button>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Create Store' />
      </ListItem>
    </Link>
  </div>
);
