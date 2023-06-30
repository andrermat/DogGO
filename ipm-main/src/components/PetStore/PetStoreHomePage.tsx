import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PetStoreBadge from './petStoreBadge';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';


const theme = createTheme({
palette: {
    info: {
      // light: will be calculated from palette.primary.main,
      main: '#FFFFFF',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
 }
});

export default function PetStorePage() {
    return (
        <ThemeProvider theme={theme}>
            <div style = {{display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight:"100vh", height:"auto"}}>
                <div>
                    <h1 style = {{textAlign: "center", color: "white",fontFamily: "'Poppins', sans-serif"}}>Our Pet Store</h1>
                    <Link to="/" style={{textDecoration:"none"}}>
                        <Button variant="outlined" color="info" startIcon={<KeyboardReturnIcon />} style = {{marginLeft:'10%'}}>
                            <h1 style = {{fontSize:'10px'}}>Go Back</h1>
                        </Button>
                    </Link>
                </div>
                <div style={{display:"flex", margin:"auto", paddingBottom:"10vh"}}>
                    <Link to ="/foodstoreHomePage" style={{ textDecoration: "none" }}>
                        <PetStoreBadge icon="food" label="Food"/>
                    </Link>
                    <PetStoreBadge icon="health" label="Health"/>
                    <PetStoreBadge icon="other" label="Accessories"/>
                </div>
            </div>
        </ThemeProvider>
    );
}