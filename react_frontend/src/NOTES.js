// SomeContext.js
// --------------
import {createContext} from "react"
export const SomeContext = createContext(null);
// --------------------------------------------------------------------


// AboutWithContext.js
// ----------------------
import React, {useContext, useEffect} from "react";
import {SomeContext} from "./SomeContext.js"

export function AboutWithContext(){
	const {some_value,setSomeValue} = useContext(SomeContext);

	return(
		<div>
			About.js {some_value}
			<button onClick={()=>setSomeValue('LALALALAL')}>AboutClick</button>
		</div>
	)
}
// --------------------------------------------------------------------


// HomeWithContext.js
// ----------------------
import React, {useContext }from "react";
import {SomeContext} from "./SomeContext.js"

export function HomeWithContext(){
	const {some_value,setSomeValue} = useContext(SomeContext);

	return(
		<div>
			Home.js {some_value}
			<button onClick={()=>setSomeValue('fafafa')}>Home clickme</button>
		</div>
	)
}
// --------------------------------------------------------------------


// DashWithContext.js
// ---------------------
import {HomeWithContext} from "./HomeContext";
import {AboutWithContext} from "./AboutContext";
import {SomeContext} from "./SomeContext";
import { useEffect, useMemo, useState } from "react";

export default function DashWithContext(){

	const [some_value,setSomeValue] = useState(Date());
	const memsome_value = useMemo(()=>{
        console.log('memsome_value',some_value);
        return ({some_value,setSomeValue})
    },[some_value,setSomeValue]);

	return(
		<div>
			<SomeContext.Provider value = {memsome_value}>
                <HomeWithContext/>
                <AboutWithContext/>
			</SomeContext.Provider>
		</div>
	)
}