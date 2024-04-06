import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectComments, selectFullNews} from "./commentsSlice.ts";
import {getCommentsApi, getNewsFromApiId} from "./commentsThuncks.ts";
import {CardContent, CardHeader, CardMedia, Container, Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import {API_URL} from "../../constants.ts";
import CommentFrom from "./components/CommentFrom/CommentFrom.tsx";
import AlertComment from "./components/AlertComment/AlertComment.tsx";

const ReadFullNews: React.FC = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const fullNews = useAppSelector(selectFullNews);
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    if (id) {
      dispatch(getNewsFromApiId(id));
      dispatch(getCommentsApi(id));
    }
  }, [dispatch, id]);

  const cardMedia =  fullNews
    ? <CardMedia
      component="img"
      height="200"
      image={API_URL + '/' + fullNews.image}
      alt="Paella dish"
    />
    : undefined;

  let news = <div></div>;
  if (fullNews) {
    news = (
      <Container sx={{mt:4}}>
        <Card sx={{width: "90%"}}>
          <CardHeader
            title={fullNews.title}
            subheader={dayjs(fullNews.datetime).format("DD/MM/YYYY")}
          />
          <Grid item xs width={300}>
            {cardMedia}
          </Grid>
          <CardContent>
            {fullNews.description}
          </CardContent>
        </Card>

        <Grid container mt={4}>
          <Typography variant={"h5"}>Comments</Typography>
          <Grid container direction={"row"} justifyContent={"space-between"}>
            <Grid display={"flex"} flexDirection={"column"}  gap={2}>
              {comments.map((item) => {
                return <AlertComment key={item.id} item={item}/>;
              })}
            </Grid>
            <CommentFrom id={id}/>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return news;
};

export default ReadFullNews;