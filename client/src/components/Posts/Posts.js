import React, { useEffect } from "react";
import Post from "./Post/Post.js";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

import { useSelector } from "react-redux";

function Posts({ setCurrentId }) {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  console.log(isLoading);

  if (!posts?.length && !isLoading) return <div>No Posts</div>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} mg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
