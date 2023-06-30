import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface serviceProps {
  image?: string,
  title?: string,
  description?: string,
  price?: number
}

export default function CardService(props: serviceProps) {

  function PriceLabel(props: serviceProps) {
    const price = props.price;
    if (price) {
      let priceTag = price + "€/hora"
      return (
        <div style={{ display: "flex", marginTop:"20px"}}>
          <h5 style={{ marginLeft: "auto", marginRight:"20px", fontSize: "18px", fontWeight: "bold" }}>
            {priceTag}
          </h5>
        </div>);
    } else {
      return <b></b>;
    }
  }

  return (
    <div style={{ marginTop: "12px", marginLeft: "12px", width:"300px"}}>
      <div style={{ textDecoration: "none", cursor: "pointer" }}>
        <Card style={{ width: "100%" }} sx={{
          height: "400px",
          '&:hover': {
            backgroundColor: 'white',
            opacity: [0.6, 0.6, 0.6],
            transition: "0.1s",
          },
        }}>
          <CardMedia
            component="img"
            height="200"
            width="180"
            src={props.image}
            alt=""
          />
          <CardContent>
            <Typography style={{fontWeight: "bold", height:"1.5cm", fontSize:"16pt"}} gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" style={{height:"0.3cm"}}>
              {props.description}
            </Typography>
          </CardContent>
          <PriceLabel  price={props.price}></PriceLabel>
        </Card>
      </div>
    </div>
  );
}





