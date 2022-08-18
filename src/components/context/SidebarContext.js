import React, {useContext } from 'react';

export const SidebarContext = React.createContext();

export default function SidebarContextProvider({children}){
    const [expand, setExpand] = React.useState(true);
    return(
    <SidebarContext.Provider value={{expand,setExpand}}>
        {children}
    </SidebarContext.Provider>
        
    )
}