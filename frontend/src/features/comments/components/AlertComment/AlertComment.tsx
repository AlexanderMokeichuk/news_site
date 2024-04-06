import React from "react";
import {CommentFromBackend} from "../../../../type";
import {Avatar, CardContent, CardHeader, Grid, IconButton} from "@mui/material";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "../../../../app/hooks.ts";
import {deleteCommentApi, getCommentsApi} from "../../commentsThuncks.ts";

interface Props {
  item: CommentFromBackend;
}
const AlertComment: React.FC<Props> = ({item}) => {
  const dispatch = useAppDispatch();
  const deleteComment = async () => {
    await dispatch(deleteCommentApi(item.id));
    await dispatch(getCommentsApi(item.news_id.toString()));
  };
  return (
    <Card  sx={{width: 600}}>
      <Grid container direction={"row"} alignItems={"center"}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "grey" }} aria-label="recipe"/>
          }
          title={item.author}
        />
        <CardContent>
          {item.comment}
        </CardContent>
        <IconButton
          onClick={deleteComment}
          type={"button"}
          sx={{marginLeft: "auto"}}
          aria-label="delete"
          color="primary"
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Card>
  );
};

export default AlertComment;