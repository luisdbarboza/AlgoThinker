import React, { useContext, useEffect, useState } from "react";
import { sections } from "../../bdd";
import useDropdown from "../../hooks/useDropdown";
import { SidebarContext } from "../../context/sidebarContext";
import * as classes from "./Sidebar.module.scss";
import clx from "classnames";
import { Link } from "react-router-dom";

//Aja chicos, para meter nuevas rutas en el sidebar, tienen que ir al archivo bdd.js
//las sections del nivel suberior, el del fondo negro, son links a las principales secciones
//si quieren insertar otra seccion, copian y pegan un objeto, y cambian sus caracteristicas

const SubSectionContent = ({ subsectionVisible }) => {

  console.log(subsectionVisible);

  return (
    <div className={classes.subsection}>
      <h3 className={classes.title}>{subsectionVisible.name}</h3>
      <ul>
        {subsectionVisible.sections.map((section, index) => {
          return <li key={index}>
            <Link to={`/learn/${subsectionVisible.parentSection}/${subsectionVisible.name}/${section.name}`}>
              {section.name}
            </Link>
          </li>;
        })}
      </ul>
    </div>
  );
};

const SubSection = ({ parentSection, sublink, setSubsectionVisible }) => {
  const [show, setShow] = useState(false);

  return (
    <li
      onMouseEnter={() => {
        //Muestra la subseccion al pasar por encima de su zona en el desplegable
        setShow(true);
        sublink.parentSection = parentSection;
        setSubsectionVisible(sublink);
      }}
    >
      <Link to={`/learn/${parentSection}/${sublink.name}`}>{sublink.name}</Link>
      <img src="/assets/img/icons/arrow-right.svg" alt={sublink.name} />
    </li>
  );
};

const DropDownLink = ({
  section,
  dropdowns,
  setDropdowns,
  setSubsectionVisible,
}) => {
  const isDropDown = section.sections && section.sections.length > 0;

  return (
    <>
      <li
        className={classes.dropdownLi}
        onClick={() => {
          if(dropdowns[section.name]) {
            setSubsectionVisible(null);   
          }

          setDropdowns(section.name);
        }}
      >
        <div className={classes.icon}>
          <img
            className={classes.linkImg}
            src={section.icon}
            alt={section.name}
          />
        </div>

        <div className={classes.linkText}>
          <Link to={`/learn/${section.id}`}>
            <span>{section.name}</span>
          </Link>
          {isDropDown && (
            <div className={classes.dropdownIcon}>
              <img
                className={dropdowns[section.name] ? classes.up : undefined}
                src="/assets/img/icons/arrow_drop_down.svg"
                alt="show-content"
              />
            </div>
          )}
        </div>
      </li>
      {isDropDown && (
        <div
          className={clx({
            [classes.dropdownContent]: true,
            [classes.active]: dropdowns[section.name],
          })}
        >
          <ul>
            {isDropDown &&
              section.sections.map((sublink, index) => {
                return (
                  <SubSection
                    key={index}
                    parentSection={section.id}
                    sublink={sublink}
                    setSubsectionVisible={setSubsectionVisible}
                  />
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

const Sidebar = () => {
  const [dropdowns, setDropdowns] = useDropdown({});
  const [subsectionVisible, setSubsectionVisible] = useState(null);
  const { showMobile } = useContext(SidebarContext).sidebarState;

  //Configura los desplegables para que esten cerrados por defecto
  useEffect(() => {
    let initialDropdows = {};

    for (let section of sections) {
      initialDropdows[section.name] = false;
    }

    setDropdowns(initialDropdows, false, true);
  }, []);

  return (
    <div
      className={clx({
        [classes.sidebarWrapper]: true,
        [classes.mobileActive]: showMobile,
      })}
      onMouseLeave={() => {
        setDropdowns(dropdowns, true);
        setSubsectionVisible(null);
      }}
    >
      <div className={classes.sidebar}>
        <div className={classes.logoWrapper}>
          <div className={classes.icon}>
            <img
              className={classes.linkImg}
              src="/assets/img/icons/neural.svg"
              alt="algothink-pic"
            />
          </div>
          <div className={`${classes.linkText} ${classes.title}`}>
            AlgoThink
          </div>
        </div>
        <nav>
          <ul>
            {sections.map((section, index) => {
              return (
                <DropDownLink
                  key={index}
                  section={section}
                  dropdowns={dropdowns}
                  setDropdowns={setDropdowns}
                  subsectionVisible={subsectionVisible}
                  setSubsectionVisible={setSubsectionVisible}
                />
              );
            })}
          </ul>
        </nav>
      </div>
      {subsectionVisible && (
        <SubSectionContent subsectionVisible={subsectionVisible} />
      )}
    </div>
  );
};

export default Sidebar;
