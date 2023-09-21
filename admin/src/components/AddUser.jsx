import React from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { addUserdetails } from "../services/api";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const AddUser = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  const onvaluechange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  const adduserdetails = async () => {
    try {
      await addUserdetails(user);
      toast.success('User Created Successfully');
      navigate('/alluser');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('User already exists');
      } else {
        // Handle other errors ( server errors).
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  
  

  return (
    <div>
      <Container>
        <Typography variant="h4">Add User</Typography>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input onChange={(e) => onvaluechange(e)} name="name" />
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input onChange={(e) => onvaluechange(e)} name="email" />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input onChange={(e) => onvaluechange(e)} name='password' />
        </FormControl>
        <FormControl>
          <InputLabel>confirm Password</InputLabel>
          <Input onChange={(e) => onvaluechange(e)} name='confirmpassword' />
        </FormControl>
        <FormControl>
          <Button onClick={() => adduserdetails()} variant="contained">ADD USER</Button>
        </FormControl>
      </Container>
    </div>
  );
};

export default AddUser;
