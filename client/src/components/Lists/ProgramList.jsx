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

// répétition car ESLint et console
ProgramList.defaultProps = {
  programs: [],
};

export default ProgramList;
