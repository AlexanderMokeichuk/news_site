import React, {PropsWithChildren} from "react";
import {Link} from "react-router-dom";
import {Container} from "@mui/material";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <header style={{background: "blue"}}>
        <Container sx={{padding:2}}>
          <Link to={"/"} style={{textDecoration: "none", color: "white"}}>News</Link>
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