import Box from '@mui/material/Box';
import { ReactComponent as DogWalking} from './icons/dogWalking.svg';
import { ReactComponent as Veterinary} from './icons/veterinary.svg';
import { ReactComponent as PetSitting} from './icons/petSitting.svg';
import { ReactComponent as Bathing} from './icons/bathing.svg';
import { ReactComponent as Meeting} from './icons/meeting.svg';
import { ReactComponent as Training} from './icons/training.svg';


interface  iconProps {
    description?: string,
    icon?: string,
    link?: string,
}

export default function appIcon(props:iconProps) {


    const icons = {
      marginTop: '2px',
      marginLeft: '12px'
    };

    const content = {
      color: 'white',
      fontSize: '23px',
      fontWeight: 'bold',
      width: '190%',
      height: '60%',
      marginTop: '15%',
      marginLeft: '-45%',
      fontFamily: "'Poppins', sans-serif",
      textDecoration: "none"
    };

    const iconImage = {
      display: 'block',
      width: '130%',
      height: '130%',
      marginLeft: '-15%',
      marginTop: '-85%',
      marginBottom: '10%',
      textDecoration: "none",
    }

    function Icons(props:iconProps) {
      const icon = props.icon;
      if(icon === 'dogWalking') {
        return <DogWalking style = { iconImage } fill= "white"/>;
      } else if(icon === 'veterinary') {
          return <Veterinary style = { iconImage } fill= "white"/>;
      } else if(icon === 'petSitting') {
        return <PetSitting style = { iconImage } fill= "white"/>;
      } else if(icon === 'bathing') {
        return <Bathing style = { iconImage } fill= "white"/>;
      } else if(icon === 'meeting') {
        return <Meeting style = { iconImage } fill= "white" stroke="white"/>;
      } else if(icon === 'training') {
        return <Training style = { iconImage } fill= "white" stroke="white"/>;
      } else {
        return <b></b>;
      }
    }

  return (
    <div style={ icons }>
      <div style = {{textDecoration: "none" }} >
        <Box
          sx={{
            p: 10,
            width: 75,
            height: 75,
            borderRadius: 13,
            textAlign: "center",
            textDecoration: "none",
            backgroundColor: '#68D0D0',
            '&:hover': {
              backgroundColor: '#343F4B',
              opacity: [0.6, 0.6, 0.6],
              transition: "0.3s",
            },
          }}
          >
            <Icons
              icon={props.icon}
            />
            <div style={content}>
                {props.description}
            </div>
        </Box>
      </div>
    </div>
  );
}
