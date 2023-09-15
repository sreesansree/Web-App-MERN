import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import "./RegisterScreen.css";
import Loader from "../components/Loader";
import {useUpdateUserMutation} from '../slices/usersApiSlice';

const ProfileScreen = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [previewImage, setPreviewImage] = useState('');
  const [profileimage,setProfileImage]=useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile,{ isLoading }] = useUpdateUserMutation();

  useEffect(()=>{

    if(userInfo)
    {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setProfileImage(userInfo.profileimage || '');
      setPreviewImage(userInfo.profileimage || '')
    }

  },[userInfo])

  const handleFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    previewFile(file);
  };
  
  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      setPreviewImage(result);
      setProfileImage(result); 
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match');
    } else {
      try {
        const res = await updateProfile({
          _id:userInfo._id,
          name,
          email,
          password,
          profileimage
        }).unwrap();
        console.log(res)
        dispatch(setCredentials({...res}));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center mb-4">Update Profile</h1>
      <Form onSubmit={handleSubmit}>

      <FormGroup className="my-2" controlId="image">
          <FormLabel>PROFILE PHOTO</FormLabel>
          {profileimage && (
            <img
              src={profileimage}
              alt="Profile"
              style={{ maxWidth: "150px", marginBottom: "10px" }}
            />
          )}
          <FormControl
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FormGroup>

        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>

        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3" >
          Update
        </Button>


      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;








