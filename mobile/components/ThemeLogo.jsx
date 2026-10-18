import LogoLight from '../assets/app-logo-light.png'
import LogoDark from '../assets/app-logo-dark.png'
// import LogoDark from "../assets/app-logo-dark.png ";
import { useColorScheme, Image } from 'react-native';
// import { colors } from '../constants/colors';

const ThemeLogo = () => {
    const colorScheme = useColorScheme();
   
    const Logo=colorScheme==="dark"?LogoDark:LogoLight;
  return (
    <Image source={Logo} style={{width:100,height:100}}/>
  )
}

export default ThemeLogo
