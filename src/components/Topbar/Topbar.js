import React, {useContext} from 'react';
import { SidebarContext } from "../../context/sidebarContext";
import { topbar, menuBtn } from "./Topbar.module.scss";

const Topbar = () => {
    const {dispatchSidebar} = useContext(SidebarContext);

    return (
        <header>
            <div className={topbar}>
                <div className={menuBtn} onClick={() => {
                    dispatchSidebar({type: "TOGGLE_SIDEBAR_MOBILE"});
                }}>
                    <img src="/assets/img/icons/menu.svg" alt="menu button" />
                </div>
            </div>
        </header>
    );
}
 
export default Topbar;