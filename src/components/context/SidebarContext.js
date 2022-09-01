import React, {useContext } from 'react';

export const SidebarContext = React.createContext();

export default function SidebarContextProvider({children}){
    const [expand, setExpand] = React.useState(true);
    const [apiData, setApiData] = React.useState({});
    const [trigger, setTrigger] = React.useState(false);
    return(
    <SidebarContext.Provider value={{expand,setExpand,apiData,setApiData,trigger,setTrigger}}>
        {children}
    </SidebarContext.Provider>
        
    )
}