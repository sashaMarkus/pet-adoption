import React, { useState } from "react";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";

const Profile = ({ user }) => {
  const classes = useStyles();
  const parsedUser = JSON.parse(user);
  const [userData, setUserData] = useState({
      email: '',
      name: '',
  })
  const handleSubmit = () => {

  }
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography varian="h6" className={classes.header}>Profile</Typography>
        <TextField
          name="email"
          variant="outlined"
          label={parsedUser.result.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        ></TextField>
        <TextField
          name="name"
          variant="outlined"
          label={parsedUser.result.name}
        ></TextField>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Profile;
