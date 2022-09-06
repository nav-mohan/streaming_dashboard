// about.js
// --------
import React, {useContext, useEffect} from "react";
import {SomeContext} from "./SomeContext.js"

export function AboutWithContext(){
	const {some_value,setSomeValue} = useContext(SomeContext);

	return(
		<div>
			About.js
			<button onClick={()=>setSomeValue('LALALALAL')}>AboutClick</button>
		</div>
	)
}
