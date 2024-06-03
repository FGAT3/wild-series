import PropTypes from "prop-types";
import CustomList from "./CustomList";

function CategoryList({ categories }) {
  return (
    <CustomList
      itemList={categories}
      listName="categories"
      itemNameKey="name"
    />
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategoryList;
