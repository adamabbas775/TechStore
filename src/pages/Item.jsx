import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import clsx from 'clsx';
import {Grid, Paper, Button} from '@material-ui/core';

import {useStyles} from '../styles';
import {db} from '../firebase';

function Item() {
  const {sid, cid, itemId} = useParams();
  const [item, setItem] = useState('');
  const history = useHistory();

  //get current category
  useEffect(() => {
    db.collection('stores')
      .doc(sid)
      .collection('categories')
      .doc(cid)
      .collection('items')
      .doc(itemId)
      .get()
      .then(doc => {
        setItem({...doc.data(), id: itemId});
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }, [sid, cid, itemId]);

  console.log(item);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <Button
        onClick={() => history.push(`/stores/${sid}/categories/${cid}`)}
        variant='primary'
      >
        Back
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <h2>Item Name: {item.name}</h2>
            <h3>Item Price: {item.price}</h3>
            <h3>Item Description: {item.description}</h3>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <img src={item.url} alt={item.name} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Item;
