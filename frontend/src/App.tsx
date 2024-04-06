import Layout from "./UL/components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import News from "./features/news/News.tsx";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<News />)}/>
      </Routes>
    </Layout>
  );
}

export default App;
