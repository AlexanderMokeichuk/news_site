import React, {ChangeEvent, FormEvent, useState} from "react";
import {CommentForm} from "../../../../type";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useAppDispatch} from "../../../../app/hooks.ts";
import {addComment, getCommentsApi} from "../../commentsThuncks.ts";

interface Props {
  id: string | undefined,
}

const defaultSate: CommentForm = {
  author: "",
  comment: "",
};
const CommentFrom: React.FC<Props> = ({id}) => {
  const [commentFrom, setCommentFrom] = useState<CommentForm>(defaultSate);
  const dispatch = useAppDispatch();

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setCommentFrom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      await dispatch(addComment({
        newsId: Number(id),
        author: commentFrom.author,
        comment: commentFrom.comment,
      }));
      await dispatch(getCommentsApi(id));
      setCommentFrom(defaultSate);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{width: 400}}>
      <Typography variant={"h6"}>Add comment</Typography>
      <Grid
        container
        direction={"row"}
        sx={{
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: 2,
          }}>
          <AccountCircle sx={{color: "action.active", mr: 1, my: 0.5}}/>
          <TextField
            id="input-with-sx"
            name={"author"}
            label="Author"
            variant="standard"
            required

            value={commentFrom.author}
            onChange={onChangeForm}
          />
        </Box>

        <TextField
          id="outlined-multiline-flexible"
          name={"comment"}
          required
          multiline
          fullWidth={true}
          minRows={6}
          maxRows={10}

          value={commentFrom.comment}
          onChange={onChangeForm}
        />
        <Button
          variant="contained"
          aria-label="Basic button group"
          type={"submit"}
          sx={{
            display: "flex",
            marginTop: 2,
            marginLeft: "auto"
          }}
        >
          Send
        </Button>
      </Grid>
    </form>
  );
};

export default CommentFrom;