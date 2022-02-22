import { Button, Box, Paper } from "@mui/material";
import React from "react";
import "./ClassMember.css";

function ClassMember() {
  return (
    <div>
      <h1 className="classname" style={{ paddingLeft: "5%", fontSize: 36 }}>
        ห้องเรียน 240-124
      </h1>
      <Paper
        className="membertopic"
        variant="contained"
        sx={{
          borderRadius: 3,
          width: 150,
          height: 40,
          marginLeft: "5%",
          marginRight: 0,
        }}
        style={{ background: "#F19528" }}
      >
        <h3 className="center" style={{ paddingLeft: "30%",paddingTop:5}}>สมาชิก</h3>
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,

            width: "90%",
            height: 200,
            borderRadius: 3,
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <Paper elevation={3}></Paper>
      </Box>
    </div>
  );
}

export default ClassMember;
