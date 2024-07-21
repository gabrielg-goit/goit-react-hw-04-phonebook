import React, { useState } from 'react';
import style from './PhonebookForm.module.css';
import PropTypes from 'prop-types';

export const PhonebookForm = ({ handleFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const validateName = name => {
    const nameRegex = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
  };

  const validateNumber = number => {
    const phoneRegex =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
    return phoneRegex.test(number);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateName(name)) {
      alert('Name may contain only letters, apostrophe, and spaces');
      return;
    }
    if (!validateNumber(number)) {
      alert(
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      );
      return;
    }
    handleFormSubmit(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.label}>
        Name:
        <input
          className={style.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={style.label}>
        Phone Number:
        <input
          className={style.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button className={style.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

PhonebookForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};
