import PropTypes from "prop-types";

function CourseCard({ key, imgSrc, title, description, onClick }) {
  return (
    <div
      key={key}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className="items-center justify-center w-[300px] bg-orange-400 rounded-md border mx-auto"
    >
      <img
        src={imgSrc}
        alt={title}
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold tracking-[1px]">{title}</h1>
        <p className="mt-3 text-sm text-slate-900 tracking-[1px]">{description}</p>
      </div>
    </div>
  );
}

CourseCard.propTypes = {
    key: PropTypes.number.isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default CourseCard;
