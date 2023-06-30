import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import CustomPopup from '../customPopup/CustomPopup';
import * as React from 'react';
import Button from '@mui/material/Button';
import { makeReview } from '../../Services/httpRequests';


interface itemProps {
    itemImage?: string
    itemName?: string
    itemLocation?: string
    itemDescription: string
    itemPrice?: number
    userImage?: string
    userName?: string
    userRating?: number | null
    serviceId: string

}

export default function ServiceHistoryItem(props: itemProps) {

    const submitReview = () => {
        makeReview(description, value, props.serviceId).then(
            (response) => {
                setVisibility(false)
            },
            (error) => {
                console.log(error)
            }
        );

    }

    const [visibility, setVisibility] = useState(false);
    const [value, setValue] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const descriptionHandler = (e: any) => {
        setDescription(e.target.value)
    }
    const popupCloseHandler = () => {
        setVisibility(false);
    };
    console.log(props.userImage)

    const truncate = (input: string) =>
        input?.length > 10 ? `${input.substring(0, 225)}(...)` : input;

    const buttonStyleLeft = {
        backgroundColor: 'white',
        opacity: '0.8',
        fontFamily: "'Poppins', sans-serif",
        borderRadius: "10px",
        width: "70%",
        fontSize: "26px",
        marginTop: "3.2cm",
        marginLeft: "-16cm",
        fontWeight: "bold",
        border: "#68D0D0 1px solid",
    }

    const buttonStyleRight = {
        backgroundColor: 'white',
        opacity: '0.8',
        fontFamily: "'Poppins', sans-serif",
        borderRadius: "10px",
        width: "70%",
        fontSize: "26px",
        marginTop: "3.2cm",
        marginLeft: "2.5cm",
        marginRight: "-12cm",
        fontWeight: "bold",
        border: "red 1px solid",
    }

    return (
        <div style={{ display: "flex", backgroundColor: "white", borderRadius: "7px", marginBottom: "2vh", maxHeight: "4.5cm", height: "5cm", width: "100%", fontFamily: "'Poppins', sans-serif", padding: "1%", border: "1px black solid" }}>
            
            <img alt="service" style={{ marginBottom: "1vh", marginTop: "1vh", marginLeft: "1vw", height: "4cm", width: "6cm", borderRadius: "7px", border: "1px black solid" }} src={props.itemImage} />
            
            <div style={{ marginLeft: "1%", width: "75%" }}>
                <p style={{ marginLeft: "2vw", marginTop: "-1%", }}>
                    <span><strong>Service: </strong>{props.itemName}</span>
                    <p></p>
                    <span style={{ marginRight: "3%" }}><strong>Location: </strong>{props.itemLocation}</span><span><strong>Price: </strong>{props.itemPrice} €/hora</span>
                    <p></p>
                    <span><strong>Description: </strong></span>
                    <p></p>
                    <span>{truncate(props.itemDescription)}</span>
                </p>
            </div>

            <div style={{ justifyContent: "center",width:"15%"}}>

                <Avatar src={props.userImage} style={{margin:"auto"}} sx={{ width: 66, height: 66, }} />
                

                <div style={{textAlign:"center"}}>
                    {props.userName}
                </div>

                <div onClick={() => setVisibility(true)} style={{marginTop:"20px", display:"flex", textDecoration: "none", color: '#68D0D0' }}>
                        <ReviewsIcon style={{marginLeft:"auto"}} />
                        <Typography style={{marginRight:"auto"}} sx={{
                            '&:hover': {
                                textDecoration: "underline",
                                color: "#343F4B",
                                opacity: [0.6, 0.6, 0.6],
                                transition: "0.3s",
                            },
                        }}>
                            Rate
                        </Typography>
                </div>

                <div style={{ fontFamily: "'Poppins', sans-serif", textAlign: "center", }}>

                    <CustomPopup
                        onClose={popupCloseHandler}
                        show={visibility}
                        title="Do you wish to rate this user?">

                        <div style={{ display: "flex", width: "350px", height: "350px", }}>

                            <div style={{ marginLeft: "12%", marginTop: "2%", }}>
                                <Avatar sx={{ ml: "12%", width: 66, height: 66, }} src={props.userImage} />
                                <Typography sx={{ fontFamily: "'Poppins', sans-serif", mt: "5%" }}>{props.userName}</Typography>
                            </div>

                            <div style={{ position: "absolute", left: "40%", top: "22%", }}>
                                <span>
                                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", }}>Your feedback:</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            if (newValue)
                                                setValue(newValue);
                                        }}
                                    />

                                    <p></p>

                                </span>

                                <Typography sx={{ ml: "-140%", fontFamily: "'Poppins', sans-serif", }}>Leave your comment:</Typography>

                                <p></p>

                                <textarea onChange={descriptionHandler} style={{ position: "absolute", left: "-70%", }} rows={6} cols={56}></textarea>

                                <p></p>

                                <Button onClick={submitReview} disabled={description.length === 0} type="submit" style={buttonStyleLeft}>
                                    <span style={{ color: "#68D0D0", }}>Confirm</span>
                                </Button>

                                <Button onClick={popupCloseHandler} style={buttonStyleRight}>
                                    <span style={{ color: "red", }}>Cancel</span>
                                </Button>

                            </div>
                        </div>

                    </CustomPopup>
                </div>

            </div>
        </div>
    );
}