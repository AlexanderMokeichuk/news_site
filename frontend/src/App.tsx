import Layout from "./UL/components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import News from "./features/news/News.tsx";
import NewsForm from "./features/news/components/NewsForm/NewsForm.tsx";
import {Grid} from "@mui/material";
import ReadFullNews from "./features/comments/ReadFullNews.tsx";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<News />)}/>
        <Route path={"/add-news"} element={(
          <Grid container justifyContent={"center"}>
            <NewsForm />
          </Grid>
        )}/>
        <Route path={"/show-news/:id"} element={(<ReadFullNews />)}/>
        <Route path={"*"} element={("Not Found")}/>
      </Routes>
    </Layout>
  );
}

export default App;
