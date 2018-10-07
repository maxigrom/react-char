// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Meow from '../../Components/Meow';

export const mainListItem = (
  <>
  <ListItem button>
    <Meow />
    <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
  </ListItem>
  <ListItem button>
    <Meow />
    <ListItemText primary="Work" secondary="Jan 7, 2014"/>
  </ListItem>
  <ListItem button>
    <Meow />
    <ListItemText primary="Vacation" secondary="July 20, 2014"/>
  </ListItem>
  </>
);
