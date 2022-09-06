// home.js
// --------
import React, {useContext }from "react";
import {SomeContext} from "./SomeContext.js"

export function HomeWithContext(){
	const {some_value,setSomeValue} = useContext(SomeContext);

	return(
		<div>
			Home.js
			<button onClick={()=>setSomeValue('fafafa')}>Home clickme</button>
		</div>
	)
}
