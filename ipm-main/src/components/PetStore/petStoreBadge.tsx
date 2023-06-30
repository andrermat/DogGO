import { ReactComponent as Food} from '../general/icons/alimentation.svg';
import { ReactComponent as Health} from '../general/icons/health.svg';
import { ReactComponent as Toys} from '../general/icons/dogToys.svg';
import Box from '@mui/material/Box';

interface badgeProps {
    icon?: string,
    label?: string
}

export default function PetStoreBadge(props:badgeProps) {

      const iconImage = {
        display: 'block',
        width: '160%',
        height: '160%',
        marginLeft: '-30%',
        marginTop: '-150%',
        marginBottom: '10%',
      }

      function Icons(props:badgeProps) {
        const icon = props.icon;
        if(icon === 'food') {
          return <Food style = { iconImage } fill= "white"/>;
        } else if(icon === 'health') {
            return <Health style = { iconImage } fill= "white"/>;
        } else {
            return <Toys style = { iconImage } fill= "white"/>;
        }
      }

      return (
        <div style={{textAlign:"center", marginTop: '2vh', marginLeft: '1vw'}}>
          <div style = {{textDecoration: "none" }}>
            <Box
              sx={{
                p: 10,
                width: "15vw",
                height: "50vh",
                borderRadius: 13,
                textAlign: "center",
                backgroundColor: '#68D0D0',
                '&:hover': {
                  backgroundColor: '#343F4B',
                  opacity: [0.6, 0.6, 0.6],
                  transition: "0.3s",
                },
              }}
              >
                <div style={{textAlign:"center", color: 'white', fontSize:'5vh', fontWeight: 'bold', fontFamily: "'Poppins', sans-serif", marginBottom:"5vh"}}>
                  {props.label}
                </div>
                <div style={{height:"20vh", marginTop:"55vh"}}>
                <Icons
                  icon={props.icon}
                />
                </div>
            </Box>
          </div>
        </div>
      );


}