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

export default function PetSittingServicePage() {

    return (
    <ThemeProvider theme={theme}>
        <div style = {{display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight:"100vh", height:"auto" }}>
            <div>
                <h1 style = {{textAlign: "center", color: "#FFFF",fontSize: "48px", marginTop: "2%", fontFamily: "'Poppins', sans-serif"}}>Pet Sitting Services</h1>
                <Button size = "large" variant="outlined" color = "info" startIcon={<KeyboardReturnIcon />} style = {{marginLeft:'5%'}}>
                    <h1 style = {{fontSize:'15px'}}>Go Back</h1>
                </Button>
            </div>
            <div>
                <div style = {{ marginTop: "2%", display: "flex", justifyContent: 'space-evenly', marginBottom: '1%', marginLeft:'10%' , marginRight:'10%'}}>
                    <Service title="I will take care of your dog for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.theacademyofpetcareers.com/wp-content/uploads/2018/05/AdobeStock_123950813-1200x801.jpeg" price= {2}/>
                    <Service title="I will take care of your dog for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/2/2020/03/shutterstock_1097766848-2.jpg" price= {4}/>
                    <Service title="I will take care of your dog for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://northernvirginiamag.com/wp-content/uploads/2020/03/dog-next-to-owner-on-laptop.jpg" price= {4}/>
                </div>
                <div style = {{ display: "flex", justifyContent: 'space-evenly', marginBottom: '5%', marginLeft:'10%' , marginRight:'10%'}}>
                    <Service title="I will take care of your dog for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.funtastictoy.com/wp-content/uploads/2019/06/Mother-and-baby-girl-petting-dog-social-media-image.jpg" price= {3}/>
                    <Service title="I will take care of your dog for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.petplace.com/static/7f7ef3ffb1826a04fb3098141a5ab42f/3b3b4/iStock-518314561.jpg" price= {7}/>
                    <Service title="I will take care of your dog for a good price!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.petbarn.com.au/petspot/app/uploads/2016/03/shutterstock_641203957.jpg" price= {5}/>
                </div>
            </div>
        </div>
    </ThemeProvider>

    );
}