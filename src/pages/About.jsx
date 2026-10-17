// ==================================================
// LANGUAGE CONTEXT
// ==================================================

import {
  useLanguage
} from '../context/LanguageContext.jsx';


// ==================================================
// ABOUT COMPONENT
// ==================================================

function About() {


  // ==================================================
  // 1. GET TRANSLATE FUNCTION
  // ==================================================

  // t() comes from LanguageContext.
  //
  // It gives us the correct text
  // depending on the selected language.
  const {
    t
  } = useLanguage();


  // ==================================================
  // 2. ABOUT PAGE
  // ==================================================

  return (
    <main className="aboutPage">


      {/* ABOUT TITLE */}

      <h1>
        {t('aboutTitle')}
      </h1>


      {/* ABOUT TEXT */}

      <p>
        {t('aboutText')}
      </p>


    </main>
  );

}


export default About;