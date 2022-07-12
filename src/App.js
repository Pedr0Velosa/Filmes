import {render} from "react-dom";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {StrictMode, useState, useEffect} from "react";
import SearchFilmes from "./pages/SearchFilmes";
import Overview from "./pages/Overview";
import "./css/filme.css";
import "./css/info.css";
import "./css/overview.css";
import Logo from './img/Logo.svg';
import ThemeContext from "./components/ThemeContext";

const LANGUAGES = [ 'pt-br', 'en-us', 'pt', 'uk' ];

const App = () => {

  const [ theme, setTheme ] = useState('dark-mode');
  const [ active, setActive ] = useState('');
  const [ language, setlanguage ] = useState('en-us');

  //const [ isReady, updateIsReady ] = useState(false);

  useEffect(() => {
    document.title = "TNMDB";
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  });

  const changeThemeContext = () => {
    theme === 'dark-mode' ? setTheme('light-mode') : setTheme('dark-mode');
    active === '' ? setActive('active') : setActive('');
  };

  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          <header id="header">
            <Link to="/">TNMDB</Link>
            <div className="options">
              <select name="language" id="language"
                onChange={(e) => setlanguage(e.target.value)}
                onBlur={(e) => setlanguage(e.target.value)}>
                <option />
                {LANGUAGES.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              <button
                onClick={changeThemeContext}
                className={active}
              ></button>
            </div>
          </header>
          <main data-theme={theme}>
            <Routes>
              <Route path="/overview/:id" element={<Overview language={language} />} />
              <Route path="/" element={<SearchFilmes language={language} />} />
            </Routes>
          </main>
          <footer>
            {/* eslint-disable-next-line */}
            <img src={Logo} />
          </footer>
        </BrowserRouter>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
