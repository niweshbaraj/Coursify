import PropTypes from "prop-types";

function FormBox({boxType, label, handleChange, disabled, c}) {
  return (
    <div>
      <input type={boxType} 
            id={label} 
            placeholder={label} 
            onChange={handleChange} 
            disabled={(disabled) ? "disabled" : ""}
            className={`${c} rounded-md border border-gray-300 text-gray-900`}/>
    </div>

  )
}

FormBox.propTypes = {
  boxType: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  c: PropTypes.string,
};

export default FormBox