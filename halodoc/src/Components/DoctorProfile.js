import { useParams } from 'react-router-dom';

import doctorsJson from '../database/doctors.json';
import doctorReview from '../database/doctorReviews.json';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import '../Styles/Search.scss';
import Navbar from './Navbar';
import axios from 'axios';

import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import React, {useState, useEffect} from 'react';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


  const DoctorProfile = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  //Get doctors.json
  const doctors = JSON.parse(JSON.stringify(doctorsJson));
  const info = doctors.find((doctor) => doctor.id === id);

  //Get doctorReviews.json
  const reviewsJson = JSON.parse(JSON.stringify(doctorReview));
  const reviewObject = reviewsJson.find((item) => item.doctor_id === id);


  useEffect(() => {
    axios.get('/dashboard').then((response) => {
    setBackendData(response.data)
  })})

  //When click handleReview, go to /review/doctor/id
  const handleReview = () => {
    navigate(`/review/doctor/${id}`);
  };

  const handleSchedule = async (e) => {
    navigate(`/schedule/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className='container card text-center'>
          </div>
          <div className='col-lg-5' style={{ marginTop: "50px" }}>
            <h1>
              {info.firstName} {info.lastName}
            </h1>
            <h3>
              <img src={require("../Styles/img/doctorIcon.png")} width="25px" />
              {info.specialty}
            </h3>
            {reviewObject && <h3>
              <img src={require("../Styles/img/star.png")} width="30px" />{reviewObject.rating} </h3>}
            <p> contact: {info.number} | {info.email} </p>

            <div style={{ margin: '20px' }}>
              <ButtonGroup variant='outlined' aria-label='outlined button group' >
                <Button onClick={handleSchedule}>Make appointment</Button>
                <Button onClick={handleReview}>Review</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div className="row">
        </div>
        <div className="container text-start" >
          {reviewObject &&
            reviewObject.reviews.map(function (item, i) {
              return (
                <div className="card">
                  <div className="card-header">
                    Review
                  </div>
                  <div className='card-body'>
                    <p className='card-title'> {item.email} </p>
                    <p> Rating:
                      {[...Array(item.rating)].map((_, index) => (
                        <FaStar key={index} />
                      ))}
                    </p>
                    <p className='card-text'> " {item.review} "</p>
                  </div>
                </div>
              );
            })}

        </div>
      </div>
      </div>)}
    </div>
  );
};

export default DoctorProfile;
