import React, {createContext, useReducer} from "react";

const sidebarReducer = (state, action) => {
    switch(action.type) {
        case "TOGGLE_SIDEBAR_MOBILE":
            return {...state, showMobile: !state.showMobile}
        default:
            return state;
    }
}

export const SidebarContext = createContext();

const SideBarContextProvider = ({children}) => {
    const [sidebarState, dispatchSidebar] = useReducer(sidebarReducer, {
        showMobile: false
    });

    return (
        <SidebarContext.Provider value={{sidebarState, dispatchSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
}
 
export default SideBarContextProvider;