import React, { useState } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import useStyles from "./styles";

import Search from "../Search/Search";
import Posts from "../Posts/Posts";
import Form from "../Form/From";
import Pajinate from "../Pajinate/Pajinate";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(null);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          speacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Search />
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && (
              <Paper elevation={6} className={classes.pagination}>
                <Pajinate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
