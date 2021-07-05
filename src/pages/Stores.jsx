import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {useStyles} from '../styles';
import {db} from '../firebase';

function Stores() {
  const classes = useStyles();
  const [stores, setStores] = useState([]);
  const history = useHistory();

  // useEffect =>runs a piece of code base on specific condition
  useEffect(() => {
    db.collection('stores').onSnapshot(snapshot => {
      setStores(snapshot.docs.map(doc => ({id: doc.id, store: doc.data()})));
    });
  }, []);

  return (
    <Container>
      <Button onClick={() => history.push(`/`)} variant='primary'>
        Back
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Store Name</TableCell>
              <TableCell>See Store</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores?.map(store => (
              <TableRow key={store.id}>
                <TableCell component='th' scope='row'>
                  {store.store.name}
                </TableCell>
                <TableCell>
                  <Link to={`/stores/${store.id}`}>
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
    </Container>
  );
}

export default Stores;
