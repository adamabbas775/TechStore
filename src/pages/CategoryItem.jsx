import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {
  Grid,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {useStyles} from '../styles';
import {db} from '../firebase';

function CategoryItem() {
  const {sid, cid} = useParams();
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);
  const history = useHistory();

  //get current category
  useEffect(() => {
    db.collection('stores')
      .doc(sid)
      .collection('categories')
      .doc(cid)
      .get()
      .then(doc => {
        setCategory({...doc.data(), id: sid});
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }, [sid, cid]);

  useEffect(() => {
    let unsubscribe;
    if (sid) {
      unsubscribe = db
        .collection('stores')
        .doc(sid)
        .collection('categories')
        .doc(cid)
        .collection('items')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setItems(snapshot.docs.map(doc => ({id: doc.id, item: doc.data()})));
        });
    }
    //cleanup part
    return () => {
      unsubscribe();
    };
  }, [sid, cid]);

  console.log(items);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <Button onClick={() => history.push(`/stores/${sid}`)} variant='primary'>
        Back
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <h2>Category Name: {category?.name}</h2>

            <Link to={`/stores/${sid}/categories/${cid}/create-item`}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Add Item To The Category
              </Button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <img src={category.url} alt='' />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          {items.length ? (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Item Price</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>See Item</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items?.map(item => (
                    <TableRow key={item.id}>
                      <TableCell component='th' scope='row'>
                        {item.item.name}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {item.item.price}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <img
                          src={item.item?.url}
                          style={{width: '100px', height: '100px'}}
                          alt=''
                        />
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/stores/${sid}/categories/${cid}/item/${item.id}`}
                        >
                          <IconButton>
                            <VisibilityIcon color='primary' fontSize='large' />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h1>No item found</h1>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CategoryItem;
