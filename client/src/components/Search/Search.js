import React, { useState } from "react";
import { TextField, AppBar, Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { getPostsBySearch } from "../../actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Search = () => {
  const classes = useStyles();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const dispatch = useDispatch();
  const history = useNavigate();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));
  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <TextField
        onKeyDown={handleKeyPress}
        name="search"
        variant="outlined"
        label="Search Memories"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ChipInput
        style={{ margin: "10px 0" }}
        value={tags}
        onAdd={handleAddChip}
        onDelete={handleDeleteChip}
        label="Search Tags"
        variant="outlined"
      />
      <Button
        onClick={searchPost}
        className={classes.searchButton}
        variant="contained"
        color="primary"
      >
        Search
      </Button>
    </AppBar>
  );
};

export default Search;
