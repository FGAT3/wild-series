import PropTypes from "prop-types";
import CustomList from "./CustomList";

function ProgramList({ programs = [] }) {
  return (
    <CustomList itemList={programs} listName="programs" itemNameKey="title" />
  );
}

ProgramList.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

// ESLint warning but it add a new warning in console while I already added a default value...
ProgramList.defaultProps = {
  programs: [],
};

export default ProgramList;
