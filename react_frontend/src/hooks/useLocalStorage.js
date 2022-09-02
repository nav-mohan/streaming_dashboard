import { useEffect, useState } from "react";

export default function useLocalStorage(key, default_value = null){
    const [value,setValue] = useState(()=>{
        try{
            const saved = localStorage.getItem(key);
            if(saved!==null){
                return JSON.parse(saved);
            }
            return default_value;
        }
        catch{
            return default_value;
        }
    });

    useEffect(()=>{
        console.log(key,value,'changed')
        const raw_value = JSON.stringify(value);
        localStorage.setItem(key,raw_value);
    },[key,value]);

    return [value,setValue];
};