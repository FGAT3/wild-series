import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CustomList({ itemList, listName, itemNameKey }) {
  return (
    <ul>
      {itemList.map((item) => (
        <li key={item.id}>
          <Link to={`/${listName}/${item.id}`}>{item[itemNameKey]}</Link>
        </li>
      ))}
    </ul>
  );
}

CustomList.propTypes = {
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  listName: PropTypes.string.isRequired,
  itemNameKey: PropTypes.string.isRequired,
};

export default CustomList;
