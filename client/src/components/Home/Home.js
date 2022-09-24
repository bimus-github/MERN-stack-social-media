import React, { useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles";

import Posts from "../Posts/Posts";
import Form from "../Form/From";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  //   const classes = useStyles();
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          speacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
