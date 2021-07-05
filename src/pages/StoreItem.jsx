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

function StoreItem() {
  const {sid} = useParams();
  const [store, setStore] = useState('');
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  // useEffect =>runs a piece of code base on specific condition
  useEffect(() => {
    db.collection('stores')
      .doc(sid)
      .get()
      .then(doc => {
        setStore({...doc.data(), id: sid});
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }, [sid]);

  useEffect(() => {
    let unsubscribe;
    if (sid) {
      unsubscribe = db
        .collection('stores')
        .doc(sid)
        .collection('categories')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setCategories(
            snapshot.docs.map(doc => ({id: doc.id, category: doc.data()}))
          );
        });
    }
    //cleanup part
    return () => {
      unsubscribe();
    };
  }, [sid]);

  console.log(categories);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <Button onClick={() => history.push(`/stores`)} variant='primary'>
        Back
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <h2>Store Name: {store?.name}</h2>
            <h3>Store Description: {store?.description}</h3>
            <Link to={`/stores/${sid}/create-category`}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Add Category
              </Button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <h3>No. of Categories 12</h3>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          {categories.length ? (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Cateogry Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>See Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories?.map(category => (
                    <TableRow key={category.id}>
                      <TableCell component='th' scope='row'>
                        {category.category.name}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <img
                          src={category.category?.url}
                          style={{width: '100px', height: '100px'}}
                          alt=''
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/stores/${sid}/categories/${category.id}`}>
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
            <h1>No category found</h1>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default StoreItem;
