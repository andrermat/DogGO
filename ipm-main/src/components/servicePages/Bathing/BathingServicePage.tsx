import Service from '../../general/cardService';

import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function BathingServicePage() {

    return (
    <ThemeProvider theme={theme}>
        <div style = {{display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%",minHeight:"100vh", height:"auto" }}>
            <div>
                <h1 style = {{textAlign: "center", color: "#FFFF",fontSize: "48px", marginTop: "2%", fontFamily: "'Poppins', sans-serif"}}>Bathing & Trimming Services</h1>
                <Button size = "large" variant="outlined" color = "info" startIcon={<KeyboardReturnIcon />} style = {{marginLeft:'5%'}}>
                    <h1 style = {{fontSize:'15px'}}>Go Back</h1>
                </Button>

            </div>
            <div>
                <div style = {{ marginTop: "2%", display: "flex", justifyContent: 'space-evenly', marginBottom: '1%', marginLeft:'10%' , marginRight:'10%'}}>
                    <Service title="I will give your dog a bath for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.cesarsway.com/wp-content/uploads/2015/06/How-to-get-your-dog-to-love-bath-time.jpg" price= {5}/>
                    <Service title="I will cut your dog fur for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://img.freepik.com/free-photo/yorkshire-terrier-puppy-getting-haircut-with-shaving-machine_174814-78.jpg?size=626&ext=jpg" price= {2}/>
                    <Service title="I will give your dog a bath for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://live-production.wcms.abc-cdn.net.au/14a3bd387d83f48657885dcc656d8ec3?impolicy=wcms_crop_resize&cropH=1034&cropW=1836&xPos=0&yPos=20&width=862&height=485" price= {8}/>
                </div>
                <div style = {{ display: "flex", justifyContent: 'space-evenly', marginBottom: '5%', marginLeft:'10%' , marginRight:'10%'}}>
                    <Service title="I will cut your dog fur for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://media.istockphoto.com/photos/female-groomer-haircut-pomeranian-dog-on-the-table-of-outdoor-process-picture-id1184851389?k=20&m=1184851389&s=612x612&w=0&h=N6z9UmMo-JvAi7Q9BT9cBdffY_3dhFhwTgl63w2xvso=" price= {4}/>
                    <Service title="I will cut your dog fur for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.rover.com/blog/wp-content/uploads/2019/03/groomer-above-960x513.jpg" price= {7}/>
                    <Service title="I will give your dog a bath for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/07-25/soapy+cocker+spaniel+being+bathed-min.jpg" price= {4}/>
                </div>
            </div>
        </div>
    </ThemeProvider>
    );
}