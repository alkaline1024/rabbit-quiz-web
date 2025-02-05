import { Button, Box, Paper, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import './EditProfilePopup.css';
import SaveIcon from '@mui/icons-material/Save';
import RegexTextField from "../RegexTextField";
import { ax, useAuth } from "../../auth/auth";
import { message } from "antd";
import { useNavigate } from "react-router-dom";


function EditProfilePopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /////// Get data for Default Profile /////////
  const onlyAlpha = /[^ก-๛]/gi;
  const [firstname, setFirstName] = useState(localStorage.getItem('user_first_name'));
  const [lastname, setLastName] = useState(localStorage.getItem('user_last_name'));


  let auth = useAuth()
  ////// Change Profie Section ///////
  const navigate = useNavigate()
  const handleEditName = async () => {
    if (firstname === localStorage.getItem('user_first_name') && lastname === localStorage.getItem('user__name')) {
      setOpen(false)
      return
    }
    try {
      var result = await ax.post('changeProfile', {
        "first_name": firstname,
        "last_name": lastname,
      })
      if (result.status === 200 && result.data) {
        console.log(`Changed fullname successfully...`)
        handleClose()
        let username = localStorage.getItem('id_username')
        let password = localStorage.getItem('id_password')
        const key = 'updatable';
        message.loading({
          content: 'กำลังแก้ไขข้อมูล...',
          style: { fontFamily: "Prompt", marginTop: 50, fontSize: "20px" },
          key
        });
        auth.signin({ username, password }, (response) => {
          setTimeout(() => {
            message.success({
              content: "แก้ไขข้อมูลสำเร็จ",
              style: { fontFamily: "Prompt", marginTop: 50, fontSize: "20px" },
              key,
              duration: 3,
            });
            navigate('/', { replace: true })
            navigate('/profile', { replace: true })
          }, 3000);
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        style={{ background: "#F19528" }}
        onClick={handleClickOpen}
      >
        <div className="buttonedit">แก้ไขข้อมูลส่วนตัว</div>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>

          <div className="edit-profile">แก้ไขข้อมูลส่วนตัว</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "Prompt", color: "#231F20" }}>
            {" "}กรอกชื่อและนามสกุลที่ต้องการจะเปลี่ยนจะต้องเป็นภาษาไทยเท่านั้น
          </DialogContentText>
          <p />
          <RegexTextField
            id="firstname"
            autoFocus
            fullWidth
            variant="standard"
            label="ชื่อ"
            regex={onlyAlpha}
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            inputProps={{ style: { fontFamily: "Prompt" } }}
            InputLabelProps={{ style: { fontFamily: "Prompt" } }}
          />
          <p />

          <RegexTextField
            id="surname"
            autoFocus
            fullWidth
            variant="standard"
            label="นามสกุล"
            regex={onlyAlpha}
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            inputProps={{ style: { fontFamily: "Prompt" } }}
            InputLabelProps={{ style: { fontFamily: "Prompt" } }}
          />

        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleEditName}
            sx={{ fontFamily: "Prompt", color: "white", width: 100 }}
          >

            <div className="saveButtonIcon"><SaveIcon /></div>
            <div className="saveButton">บันทึก</div>
          </Button>
          <Button onClick={handleClose} sx={{ fontFamily: "Prompt" }}>
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


function EditEmailPopup() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const auth = useAuth()
  const navigate = useNavigate()
  const [userNewEmail, setUserNewEmail] = useState(localStorage.getItem('user_email'));


  const handleEditEmail = async () => {
    if (userNewEmail === localStorage.getItem('user_email')) {
      setOpen(false)
      return
    }
    try {
      var result = await ax.post('changeEmail', {
        "email": userNewEmail
      })
      if (result.status === 200 && result.data) {
        auth.user.email = userNewEmail
        console.log(`Changed email successfully...`)
        handleClose()
        let username = localStorage.getItem('id_username')
        let password = localStorage.getItem('id_password')
        const key = 'updatable'
        message.loading({
          content: 'กำลังแก้ไขข้อมูล...',
          style: { fontFamily: "Prompt", marginTop: 50, fontSize: "20px" },
          key
        });
        auth.signin({ username, password }, (response) => {

          setTimeout(() => {
            message.success({
              content: "แก้ไขข้อมูลสำเร็จ",
              style: { fontFamily: "Prompt", marginTop: 50, fontSize: "20px" },
              key,
              duration: 3,
            });
            navigate('/', { replace: true })
            navigate('/profile', { replace: true })
          }, 3000);
        })
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div>
      <Button
        variant="contained"
        style={{ background: "#F19528" }}
        onClick={handleClickOpen}
      >
        <div className="buttonedit">แก้ไขที่อยู่อีเมล</div>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className="edit-profile">แก้ไขที่อยู่อีเมล</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "Prompt", width: 400 }}>
            กรอกที่อยู่อีเมลใหม่ที่ต้องการจะเปลี่ยน
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="nameclass"
            label="อีเมล"
            value={userNewEmail}
            onChange={(e) => setUserNewEmail(e.target.value)}
            type="email"
            fullWidth
            variant="standard"
            inputProps={{ style: { fontFamily: "Prompt" } }}
            InputLabelProps={{ style: { fontFamily: "Prompt" } }}
          />

        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleEditEmail}
            sx={{ fontFamily: "Prompt", color: "white", width: 100 }}

          >
            <div className="saveButtonIcon"><SaveIcon /></div>
            <div className="saveButton">บันทึก</div>
          </Button>
          <Button onClick={handleClose} sx={{ fontFamily: "Prompt" }}>
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { EditProfilePopup, EditEmailPopup };
