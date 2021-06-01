import React from "react";
import useStyles from "./styles";
import clsx from "clsx";
import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = localStorage.getItem("profile");
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={post.name}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardMedia
        className={classes.media}
        image={post.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
        name={post.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user && (
          <CardActions className={classes.cardActions}>
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          </CardActions>
        )}

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Type: {post.type}</Typography>
          <Typography paragraph>
            Adoption status: {post.adoptionStatus}
          </Typography>
          <Typography paragraph>Height: {post.height}</Typography>
          <Typography paragraph>Weight: {post.weight}</Typography>
          <Typography paragraph>Color: {post.color}</Typography>
          <Typography paragraph>
            Hypoallergenic: {post.hypoallergenic}
          </Typography>
          <Typography paragraph>
            DieteryRestrictions: {post.dieteryRestrictions}
          </Typography>
          <Typography>BreedOfAnimal: {post.breedOfAnimal}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
