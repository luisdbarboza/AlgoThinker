import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import classes from "../LearnSection/LearnSection.module.scss";
import { useParams } from "react-router-dom";
import { sections } from "../../bdd";

//Bastante simple, recupera la informacion de las lecciones o subsecciones
//de una categoria en especifico, del archivo bdd.js

const LearnSection = () => {
  const { section } = useParams();

  const dbSection = sections.find((dbSection) => dbSection.id === section);

  const sectionContents = !dbSection
    ? null
    : dbSection.sections.map((sections, index) => {
        return (
          <div key={index} className={classes[`course-grid-${index}`]}>
            <figure className={classes["section-logo"]}>
              <img src={sections.icon} alt="learn about arrays" />
              <figcaption>{sections.name}</figcaption>
            </figure>
            <section className={classes["subsections-list"]}>
              <ul>
                {sections.sections
                  .map((listItem, index) => {
                    return (
                      <li key={index}>
                        {listItem.name}
                        <img
                          src="/assets/img/icons/goto.svg"
                          alt={`Go to ${listItem}`}
                        />
                      </li>
                    );
                  })
                  .slice(0, 5)}
                {sections.sections.length > 4 && (
                  <li key={6} className={classes["see-more-btn"]}>
                    Ver mas
                  </li>
                )}
              </ul>
            </section>
          </div>
        );
      });

  return (
    <PageWrapper>
      <div className={classes["learn_section"]}>
        <div className={classes["wrapper"]}>
          <figure className={classes["logo-section"]}>
            <object
              type="image/svg+xml"
              data="/assets/img/icons/animated-ds.svg"
              aria-label="data structures section"
            ></object>

            {dbSection && <figcaption>{dbSection.name}</figcaption>}
          </figure>
          {dbSection && <p>{dbSection.description}</p>}
          <section className={classes["all-courses-grid"]}>
            {sectionContents ? (
              sectionContents
            ) : (
              <h2>Todavia no se ha hecho :P</h2>
            )}
          </section>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LearnSection;
