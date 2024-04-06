import React, {ChangeEvent, FormEvent, useState} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import {News} from "../../../../type";
import {useAppDispatch} from "../../../../app/hooks";
import {AccountCircle} from "@mui/icons-material";
import FileInput from "../../../../UL/components/FileInput/FileInput.tsx";
import {addNews, getNewsFromApi} from "../../newsThunks.ts";
import {useNavigate} from "react-router-dom";

const defaultState: News = {
  title: "",
  description: "",
  image: null,
};

const NewsForm: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<News>(defaultState);
  const dispatch = useAppDispatch();

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setFormState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(addNews(formState));
    navigate("/");
    await dispatch(getNewsFromApi());
    setFormState(defaultState);
  };

  return (
    <form onSubmit={onSubmit} style={{width: 400}}>
      <Grid
        item
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
            name={"title"}
            label="Title"
            variant="standard"
            required

            value={formState.title}
            onChange={onChangeForm}
          />
        </Box>

        <FileInput
          name={"image"}
          onChange={onChangeFileInput}
        />
        <TextField
          id="outlined-multiline-flexible"
          name={"description"}
          required
          multiline
          fullWidth={true}
          minRows={6}
          maxRows={10}

          value={formState.description}
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

export default NewsForm;