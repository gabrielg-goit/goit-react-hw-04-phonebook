import React, { useState, useEffect } from 'react';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { Contacts } from './Contacts/Contacts';
import { FilterContacts } from './FilterContacts/FilterContacts';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const phoneContacts = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(phoneContacts);
    if (parcedContacts) {
      setContacts(parcedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = e => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFormSubmit = (name, number) => {
    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div>
      <h1 className="title">Phonebook</h1>
      <PhonebookForm handleFormSubmit={handleFormSubmit} />

      <h2 className="title">Contacts</h2>
      <FilterContacts filter={filter} onFilterChange={handleFilterChange} />
      <Contacts
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
