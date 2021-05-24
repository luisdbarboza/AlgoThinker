import {useState} from "react";

const useDropdown = (initialValues) => {
    const [dropdowns, setDropdowns] = useState({...initialValues});

    return [
        dropdowns,
        (dropdown, reset=false, updateEntirely=false) => {
            if(reset) {

                for(let key in dropdown) {
                    dropdown[key] = false;
                }

                setDropdowns({...dropdown});
            } else {
                if(!updateEntirely) {
                    setDropdowns({
                        ...dropdowns,
                        [dropdown]: !dropdowns[dropdown]
                    });
                } else {
                    setDropdowns(dropdown);
                }
            }
        }
    ];
}
 
export default useDropdown;