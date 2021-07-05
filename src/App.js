import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import clsx from 'clsx';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
} from '@material-ui/core';

import {Menu as MenuIcon, Home as HomeIcon} from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems} from './components/listItems';

import AddStore from './pages/AddStore';
import AddItem from './pages/AddItem';
import Item from './pages/Item';
import Stores from './pages/Stores';
import Home from './pages/Home';
import StoreItem from './pages/StoreItem';
import CategoryItem from './pages/CategoryItem';
import {useStyles} from './styles';
import AddCategory from './pages/AddCategory';

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar
          position='absolute'
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <Link to='/'>
              <HomeIcon fontSize='large' color='secondary' />
            </Link>
            <IconButton color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='lg' className={classes.container}>
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/stores' exact>
                <Stores />
              </Route>
              <Route path='/stores/:sid/categories/:cid' exact>
                <CategoryItem />
              </Route>
              <Route path='/stores/:sid/categories/:cid/item/:itemId' exact>
                <Item />
              </Route>
              <Route path='/stores/:sid/categories/:cid/create-item' exact>
                <AddItem />
              </Route>
              <Route path='/stores/:sid' exact>
                <StoreItem />
              </Route>
              <Route path='/stores/:sid/create-category' exact>
                <AddCategory />
              </Route>
              <Route path='/create-store' exact>
                <AddStore />
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}
