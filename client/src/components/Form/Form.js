import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { Alert } from '@material-ui/lab';
const Form = ({ currentId, setCurrentId }) => {
  const user = localStorage.getItem('profile');
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState({
    type: "",
    name: "",
    adoptionStatus: "",
    height: "",
    image: "",
    weight: "",
    color: "",
    bio: "",
    hypoallergenic: "",
    dieteryRestrictions: "",
    breedOfAnimal: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      type: "",
      name: "",
      adoptionStatus: "",
      height: "",
      image: "",
      weight: "",
      color: "",
      bio: "",
      hypoallergenic: "",
      dieteryRestrictions: "",
      breedOfAnimal: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!postData.type) {
      setError(true);
      return;
    }
    if (currentId) {
      dispatch(updatePost(currentId, postData));
      clear();
    } else {
      dispatch(createPost(postData));
      clear();
    }
  };

  if(!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Sign in to add/delete pets
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      {error && <Alert severity='error'>All fields must be filled</Alert>}
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography varian="h6">{currentId ? "Edit" : "Add"} a pet</Typography>
        <TextField
          name="type"
          variant="outlined"
          label="Type"
          fullWidth
          value={postData.type}
          onChange={(e) => setPostData({ ...postData, type: e.target.value })}
        />
        <TextField
          name="name"
          variant="outlined"
          label="Name"
          fullWidth
          value={postData.name}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
        <TextField
          name="adoptionStatus"
          variant="outlined"
          label="Adoption status"
          fullWidth
          value={postData.adoptionStatus}
          onChange={(e) =>
            setPostData({ ...postData, adoptionStatus: e.target.value })
          }
        />
        <TextField
          name="height"
          variant="outlined"
          label="Height"
          fullWidth
          value={postData.height}
          onChange={(e) => setPostData({ ...postData, height: e.target.value })}
        />
        <TextField
          name="weight"
          variant="outlined"
          label="Weight"
          fullWidth
          value={postData.weight}
          onChange={(e) => setPostData({ ...postData, weight: e.target.value })}
        />
        <TextField
          name="color"
          variant="outlined"
          label="Color"
          fullWidth
          value={postData.color}
          onChange={(e) => setPostData({ ...postData, color: e.target.value })}
        />
        <TextField
          name="bio"
          variant="outlined"
          label="Bio"
          fullWidth
          value={postData.bio}
          onChange={(e) => setPostData({ ...postData, bio: e.target.value })}
        />
        <TextField
          name="hypoallergenic"
          variant="outlined"
          label="Hypoallergenic(yes/no)"
          fullWidth
          value={postData.hypoallergenic}
          onChange={(e) =>
            setPostData({ ...postData, hypoallergenic: e.target.value })
          }
        />
        <TextField
          name="dieteryRestrictions"
          variant="outlined"
          label="Dietery Restrictions"
          fullWidth
          value={postData.dieteryRestrictions}
          onChange={(e) =>
            setPostData({ ...postData, dieteryRestrictions: e.target.value })
          }
        />
        <TextField
          name="breedOfAnimal"
          variant="outlined"
          label="Breed of animal"
          fullWidth
          value={postData.breedOfAnimal}
          onChange={(e) =>
            setPostData({ ...postData, breedOfAnimal: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
          />
        </div>
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
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
