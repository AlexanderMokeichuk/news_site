import React from "react";
import {NewsFromBackend} from "../../../../type";
import {Button, CardContent, CardHeader, CardMedia, Grid} from "@mui/material";
import Card from "@mui/material/Card";
import dayjs from "dayjs";
import {API_URL} from "../../../../constants";
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../../app/hooks.ts";
import {deleteNews, getNewsFromApi} from "../../newsThunks.ts";

interface Props {
  news: NewsFromBackend,
}

const AlertPost: React.FC<Props> = ({news}) => {
  const dispatch = useAppDispatch();

  const deleteNewsUpdate = async () => {
    await dispatch(deleteNews(news.id));
    await dispatch(getNewsFromApi());
  };

  const cardMedia = news.image
  ? <CardMedia
      component="img"
      height="200"
      image={API_URL + '/' + news.image}
      alt="Paella dish"
    />
  : undefined;

  return (
    <Card sx={{width: "90%"}}>
      <CardHeader
        title={news.title}
        subheader={dayjs(news.datetime).format("DD/MM/YYYY")}
      />
      <Grid item xs width={300}>
        {cardMedia}
      </Grid>
      <CardContent>
        <Grid container justifyContent={"space-between"}>
          <Link to={`/show-news/${news.id}`}>Read Full Post...</Link>
          <Button type={"button"} onClick={deleteNewsUpdate} variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AlertPost;