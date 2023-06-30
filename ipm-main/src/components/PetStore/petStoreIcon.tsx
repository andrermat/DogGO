import Box from '@mui/material/Box';
import { ReactComponent as PetStore} from '../general/icons/petStore.svg';

interface  iconProps {
    description?: string
}

export default function appIcon(props:iconProps) {

    const icons = {
      marginTop: '12px',
      marginLeft: '12px'
    };

    const content = {
      display: 'block',
      color: 'white',
      fontSize: '56px',
      fontWeight: 'bold',
      width: '190%',
      height: '60%',
      marginTop: '-5%',
      fontFamily: "'Poppins', sans-serif",
    };

    const iconImage = {
      display: 'block',
      width: '50%',
      height: '50%',
      marginTop: '-10%',
    }

  return (
    <div style={ icons }>
      <a style = {{textDecoration: "none" }} href= "https://www.google.com" >
        <Box
          sx={{
            p: 10,
            width: 600,
            height: 10,
            borderRadius: 13,
            textAlign: "center",
            backgroundColor: '#99DBDB',
            '&:hover': {
              backgroundColor: '#343F4B',
              opacity: [0.6, 0.6, 0.6],
            },
          }}
          >
            <div style = {{display: 'flex', justifyContent: 'space-beetwen'}}>
                <PetStore style = { iconImage }/>
                <div style={content}>
                    {props.description}
                </div>
            </div>
        </Box>
      </a>
    </div>
  );
}
