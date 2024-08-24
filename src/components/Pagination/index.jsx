import PropTypes from "prop-types";

const Pagination = (props) => {
  return (
    <div className=" flex justify-center mt-5 pb-5">
      <div className="join">
        <button
          className="join-item btn"
          onClick={props.onClickPrevious}
          disabled={props.isPreviousDisabled}
        >
          «
        </button>
        <button className="join-item px-4 bg-primary text-white ">
          Página {props.page}
        </button>
        <button
          className="join-item btn"
          onClick={props.onClickNext}
          disabled={props.isNextDisabled}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  isPreviousDisabled: PropTypes.bool,
  onClickPrevious: PropTypes.func,
  page: PropTypes.number,
  isNextDisabled: PropTypes.bool,
  onClickNext: PropTypes.func,
};
