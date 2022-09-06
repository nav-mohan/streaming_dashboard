// SomeContext.js
// ---------------
import {createContext} from "react"
export const SomeContext = createContext(null);


// about.js
// --------
import React, {useContext} from "react";
import {SomeContext} from "./SomeContext.js"

export function About(){
	const {about_value,setAboutValue} = useContext(SomeContext);

	return(
		<div>
			<div>{about_value}</div>
			<button onClick={()=>setAboutValue('about')}>AboutValue</button>
		</div>
	)
}


// home.js
// --------
import React, {useContext }from "react";
import {SomeContext} from "./SomeContext.js"

export function Home(){
	const {home_value,setHomeValue} = useContext(SomeContext);

	return(
		<div>
			<div>{home_value}</div>
			<button onClick={()=>setHomeValue('home')}>HomeValue</button>
		</div>
	)
}


// App.js
// -------
import {Home} from "./home";
import {About} from "./about";
import {SomeContext} from "./SomeContext";

export default function App(){

	const [some_value,setSomeValue] = useState(null);
	const memsome_value = useMemo(()=>({some_value,setSomeValue}),[some_value,setSomeValue])
	
	return(
		<div>
			<SomeContext.Provider value = {memsome_value}>
				<Home></Home>
				<About></About>				
			</SomeContext.Provider>
		</div>
	)

}