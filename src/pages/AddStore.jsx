import React, {useState} from 'react';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Container,
  Typography,
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import {db} from '../firebase';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddStore() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    db.collection('stores').add({
      name,
      description,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setName('');
    setDescription('');
    history.push('/');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Create New Store
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            label='Store name'
            name='name'
            autoComplete='add store'
            autoFocus
          />
          <TextField
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='description'
            label='description'
            type='text'
            multiline
            rows='4'
            id='description'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Create Store
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default AddStore;
