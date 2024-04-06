import React, {useEffect} from "react";
import {Button, Container, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getNewsFromApi} from "./newsThunks.ts";
import {selectNews} from "./newsSlice.ts";
import {Link} from "react-router-dom";
import AlertNews from "./components/AlertNews/AlertNews.tsx";

const News: React.FC = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);

  useEffect(() => {
    dispatch(getNewsFromApi());
  }, [dispatch]);

  return (
    <Container>
      <Grid container display={"flex"} direction={"column"} gap={4} padding={4}>
        <Grid container justifyContent={"end"}>
          <Link to={"/add-news"}>
            <Button variant="contained">
              Add news
            </Button>
          </Link>
        </Grid>
        <Grid container gap={2}>
          {news.map((item) => {
            return <AlertNews key={item.id} news={item}/>;
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default News;