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
import { editUser, getUser } from "../services/api";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";


const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const EditUser = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    loadUserDetails()
  }, [])

  const loadUserDetails = async () => {
    const response = await getUser(id)
    console.log(response, '><<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    setUser(response.data)
  }


  const onvaluechange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  const edituserdetails = async () => {
    try {
      await editUser(user, id)
      toast.success('Updated Successfully')
      navigate('/alluser')
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div>
      <Container>
        <Typography variant="h4">EDIT User</Typography>
        <FormControl>
          {user.name ? <InputLabel>Name</InputLabel> : null}
          <Input onChange={onvaluechange} name="name" value={user.name || ''} />
        </FormControl>
        <FormControl>
          {user.email ? <InputLabel>Email</InputLabel> : null}
          <Input onChange={onvaluechange} name="email" value={user.email || ''} />
        </FormControl>

        <FormControl>
          <Button onClick={edituserdetails} variant="contained">UPDATE USER</Button>
        </FormControl>
      </Container>
    </div>
  );
};

export default EditUser;
