import React, { useState } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import FindChar from "../findChar/FindChar";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const DynamicCreating = (props) => {
  return (
    <div className="box">
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, { className: "shadow" });
      })}
    </div>
  );
};

const MainPage = () => {

  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="descroption" content="Marvel information"/>
        <title>Marvel information portal</title>
      </Helmet>
      <DynamicCreating>
        <h2>Hello World</h2>
        <h2>Lorem ipsum</h2>
      </DynamicCreating>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div className="char__right-box">
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
        <ErrorBoundary>
          <FindChar />
        </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;