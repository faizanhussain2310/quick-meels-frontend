
import classes from "./AddressDetails.module.css";

const AddressDetails = (props) => {
  return (
    <div className={classes.form}>
      <div className={classes.control}>
        <h3>Address:</h3>
        <h4>{props.address}</h4>
      </div>
      <div className={classes.control}>
        <h3>Landmark:</h3>
        <h4>{props.landmark}</h4>
      </div>
      <div className={classes.control}>
        <h3>Pincode:</h3>
        <h4>{props.pincode}</h4>
      </div>
      <div className={classes.control}>
        <h3>City:</h3>
        <h4>{props.city}</h4>
      </div>
    </div>
  );
};

export default AddressDetails;
