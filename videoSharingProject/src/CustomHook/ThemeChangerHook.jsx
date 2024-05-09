import { useState } from "react"
import { lightTheme, darkTheme } from "../Components/Dark_Light_Theme/Dark_Light_Theme"
const ThemeModel = () => {
    const [myTheme, setMyTheme] = useState(darkTheme);
    myTheme === darkTheme ? setMyTheme(lightTheme) : setMyTheme(darkTheme)
    return myTheme
}
export default ThemeModel