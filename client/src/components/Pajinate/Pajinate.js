import React from "react";
import useStyles from "./styles";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { useEffect } from "react";

const Pajinate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);
  const location = useLocation();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, location]);

  console.log(page);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages || 1}
      page={page || 1}
      variant="outlined"
      color="secondary"
      renderItem={(item) => (
        <PaginationItem
          color="primary"
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Pajinate;
