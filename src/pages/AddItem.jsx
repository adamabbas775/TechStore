import React, {useState} from 'react';
import firebase from 'firebase';
import {useHistory, useParams} from 'react-router-dom';
import {Button, TextField, Typography} from '@material-ui/core';

import {db, storage} from '../firebase';
import {useStyles} from '../styles';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';

function AddCategory() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const history = useHistory();
  const {sid, cid} = useParams();

  const types = ['jpg', 'png'];
  function handleChange(e) {
    let selected = e.target.files[0];
    const extArr = selected.name.split('.');
    const ext = selected.name.split('.')[extArr.length - 1];

    //only update the state when we have files selcted
    //check if we have files and valid  types
    if (selected && types.includes(ext)) {
      if (selected.size <= 75000000) {
        setFile(e.target.files[0]);
        setError(null);
      } else {
        setFile(null);
        setError('Pleas select a file with size 20mb or less');
      }
    } else {
      setFile(null);
      setError('Please select a file file (jpg, png)');
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    //get a reffrece for where the file should save in firebase
    const storageRef = storage.ref(`items/${file.name}`);
    storageRef.put(file).on(
      'state_changed',
      snapshot => {
        const percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percentage);
      },
      err => {
        setError(err);
      },
      //this function fire when the upload fully complete
      async () => {
        const url = await storageRef.getDownloadURL();
        //this stage come from the email
        db.collection(`stores`)
          .doc(sid)
          .collection('categories')
          .doc(cid)
          .collection('items')
          .add({
            url,
            name,
            price,
            description,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });

        setName('');
        setDescription('');
        setPrice('');
        setProgress(0);
        setFile(null);
        history.push(`/stores/${sid}/categories/${cid}`);
      }
    );
  };

  return (
    <div className={classes.paper}>
      <Typography component='h1' variant='h5'>
        Create New Item To The Category
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
          label='Category name'
          name='name'
          autoComplete='add store'
          autoFocus
        />
        <TextField
          value={price}
          onChange={e => setPrice(e.target.value)}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='prcie'
          label='Item Price'
          name='price'
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

        <div className='' style={{margin: '10px 0px'}}>
          <input type='file' onChange={handleChange} />
          {error && <div className='text-sm text-red-600 '>{error}</div>}
        </div>
        <div className='self-end'>
          {progress ? <CircularProgressWithLabel value={progress} /> : null}
        </div>

        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Create Item
        </Button>
      </form>
    </div>
  );
}

export default AddCategory;
