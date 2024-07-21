import style from './Contacts.module.css';
import PropTypes from 'prop-types';

export const ContactsItem = ({ name, number, onDelete }) => {
  return (
    <li className={style.item}>
      {name}: {number}
      <button className={style.buttonDelete} type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

ContactsItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
