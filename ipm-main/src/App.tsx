import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { root } from "./store/store"
import { changeIdiom, login, logout } from './store/slices';
import { propTypes } from 'react-bootstrap/esm/Image';

import jwt_decode from "jwt-decode";
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";

import HomePageGrid from './components/homepage/gridHomepage';
import ServicePage from './components/servicePages/ServicePage';
import Service from './components/general/cardService';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import DogWalkingService from './components/servicePages/DogWalking/DogWalkingService';
import PetStoreHomePage from './components/PetStore/PetStoreHomePage';
import FoodStorePage from './components/PetStore/FoodStore/foodStorePage';
import Cart from './components/Cart/Cart';
import NavBar from './components/navBar/NavBar';
import CreateServicePage from './components/servicePages/NewServicePage';
import CheckoutPage from './components/Checkout/CheckoutPage';
import MyServices from './components/myServices/myServicePage';
import ServiceHistory from './components/serviceHistory/serviceHistoryPage';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    //DAR PARSE A TOKEN EHEHE
    const token = localStorage.getItem("token")
    if (token) {
      const parsedToken: any = jwt_decode(token);
      dispatch(login({
        isLogged: true,
        token: token,
        email: parsedToken.email,
        profileImg: parsedToken.profileImg
      })
      )
    }
  }, [])
  const location = useLocation()

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if ((location.pathname.includes("myservices") || location.pathname.includes("servicehistory")) && !token)
        navigate('/')
    if ((location.pathname.includes("login") || location.pathname.includes("register")) && token)
        navigate('/')
  }, [location.pathname])


  return (
    <><NavBar />
      <Routes>
        <Route path="/" element={<HomePageGrid />} />
        <Route path="/service" element={<Service title="I will take your dog to the vet for a good price!" description="My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image="https://www.veterinaria-atual.pt/wp-content/uploads/sites/4/2021/07/iStock-1303362255-810x456.jpg" price={4} />} />
        <Route path="/dogWalking" element={<ServicePage service="Dog Walking" serviceType='DogWalking' />} />
        <Route path="/veterinary" element={<ServicePage service="Veterinary Companion Services" serviceType='VeterinaryCompanionServices' />} />
        <Route path="/petSitting" element={<ServicePage service="Pet Sitting Services" serviceType='PetSittingServices' />} />
        <Route path="/bathingandtrimming" element={<ServicePage service="Bathing" serviceType='Bathing' />} />
        <Route path="/meetandgreet" element={<ServicePage service="Meeting and Greeting Spots" serviceType='MeetingandGreetingSpots' />} />
        <Route path="/training" element={<ServicePage service="Dog Training Services" serviceType='DogTrainingServices' />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dogWalking/:id" element={<DogWalkingService />} />
        <Route path="/veterinary/:id" element={<DogWalkingService />} />
        <Route path="/meetandgreet/:id" element={<DogWalkingService />} />
        <Route path="/petSitting/:id" element={<DogWalkingService />} />
        <Route path="/bathingandtrimming/:id" element={<DogWalkingService />} />
        <Route path="/training/:id" element={<DogWalkingService />} />
        <Route path="/petstore" element={<PetStoreHomePage />} />
        <Route path="/foodstoreHomePage" element={<FoodStorePage />} />
        <Route path="/createservice" element={<CreateServicePage />} />
        <Route path="/myservices" element={<MyServices />} />
        <Route path="/servicehistory" element={<ServiceHistory />} />
      </Routes></>
  );
}

export default App;
