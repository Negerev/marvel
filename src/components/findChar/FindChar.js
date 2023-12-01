import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './findChar.scss'



const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'This field is required'
  } else if (values.name.length < 3) {
    errors.name = 'Minimum of 3 characters'
  }

  return errors
}



const FindChar = () => {
  const [char, setChar] = useState(null);
  const {loading, error, clearError, getCharacterByName} = useMarvelService()

  const updateChar = (values) => {
    clearError();
    getCharacterByName(values.name).then(onCharLoaded)
    
  }

  const onCharLoaded = (char) => {
    setChar(char)
  }
  console.log(char);

  const errorMessage = error ? <ErrorMessage /> : null;
  const results = !char ? null : char.length > 0 ? 
        <div className="find-char__success">
          <div className="find-char__success-text">There is! Visit {char[0].name} page?</div>
          <Link to={`/char/${char[0].id}`} className='button button__secondary'>
            <div className="inner">TO PAGE</div>
          </Link>
        </div> : 
        <div className="find-char__error">The character was not found. Check the name and try again</div>


  return (
    <Formik initialValues={{ name: ''}} validate={validate} onSubmit={updateChar}>
      <Form className='find-char'>
        <label className='find-char__label' htmlFor='name'>Or find a character by name:</label>
        <div className="find-char__search">
          <Field type="text" name="name" placeholder="Enter name"/>
          <button className='button button__main' type="submit" disabled={loading}>
            <div className="inner">FIND</div>
          </button>
        </div>
        <FormikErrorMessage className="find-char__error" name="name" component="div"/>
        {results}
        {errorMessage}
      </Form>
    </Formik>
  );
};

export default FindChar;