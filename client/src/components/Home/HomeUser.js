import React, {useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import { Container, Grid, Grow } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
