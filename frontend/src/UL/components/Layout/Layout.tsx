import React, {PropsWithChildren} from "react";
import {Link} from "react-router-dom";
import {Container} from "@mui/material";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <header>
        <Container sx={{padding:2}}>
          <Link to={"/"}>News</Link>
        </Container>
      </header>
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;