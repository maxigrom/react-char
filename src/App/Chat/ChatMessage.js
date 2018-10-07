// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import classnames from 'classnames';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  color: {
    backgroundColor: yellow[100]
  },
  dialog: {
    borderRadius: '20px',
    backgroundColor: green[100]
  }
});

type Props = {
  user: {
    id: number,
    login: string
  },
  text: string,
  isCurrentUser: boolean,
};

class ChatMessage extends React.Component<Props> {
  props: Props;

  render = () => {
    const { user, isCurrentUser, text, classes } = this.props;

    return (
      <Grid
        container
        spacing={16}
        direction="column"
        alignItems={isCurrentUser ? "flex-end" : "flex-start"}
       >
        <Grid item xs={12}>
          <Card className={classnames(classes.card, classes.dialog)}>
            <CardContent className={isCurrentUser ? classes.color : null}>
              <Typography color="primary" component="p">
                  {user.login}
              </Typography>
              <Typography component="p">
                {text}
              </Typography>
              <Typography color="textSecondary">
                2 hours ago
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(ChatMessage);
