import React, { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
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
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;