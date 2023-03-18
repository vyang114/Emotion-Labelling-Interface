import { Button, Flex, Text, TextField, SelectField } from '@aws-amplify/ui-react';
import React from "react";
import Batch from "./Batch.js";

export default function App() {
  return (
    <Batch />
  );
}

// import {Link} from "react-router-dom";
// {pages.map((page) => (
//  <Link to={page.link} key={page.name}> 
//   <MenuItem  onClick={handleCloseNavMenu}>
//       <Typography textAlign="center">
//         {page.name}
//       </Typography>
//    </MenuItem>
//   </Link>
// ))}