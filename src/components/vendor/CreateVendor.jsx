import React, { useState } from "react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { createVendor } from "../../api/vendor";
import { InventoryTextField } from "../common-components/textField";
import { Link } from "react-router-dom";
import { vendorPath } from "../../utils/routepath";

const successMsg = "Vendor Details Added Successfully";
const errorMsg = "Problem in adding vendor. Check the values";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  header: {
    display: "flex",
    marginBottom: "20px"
  },
  backButton: {
    marginLeft: "auto"
  },
  backLink: {
    textDecoration: "none",
    color: "white"
  }
}));

export default function CreateVendor() {
  const [vendorData, updateVendorData] = useState({});
  const [errorStatus, updateErrorStatus] = useState({
    status: "not_set"
  });
  const classes = useStyles();
  const onInputChange = (e) => {
    const { name, value } = e.target;
    const newVendorData = { ...vendorData, [name]: value };
    updateVendorData(newVendorData);
  };

  const submitVendorData = async (e) => {
    e.preventDefault();
    const createStatus = await createVendor(vendorData);
    if (createStatus.success) {
      updateErrorStatus({ status: "success", message: successMsg });
      setTimeout(() => {
        updateErrorStatus({ status: "not_set" });
      }, 5000);
    } else {
      updateErrorStatus({ status: "error", message: errorMsg });
    }
  };

  return (
    <div>
      {(errorStatus.status === "success" || errorStatus.status === "error") && (
        <Alert severity={errorStatus.status}>{errorStatus.message}</Alert>
      )}

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={submitVendorData}
      >
        <header className={classes.header}>
          <Typography variant="h5">Create Vendor</Typography>
        </header>
        <div>
          <InventoryTextField
            required
            onChange={onInputChange}
            name="name"
            label="Vendor Name"
          />
        </div>
        <div>
          <InventoryTextField
            required
            onChange={onInputChange}
            name="description"
            label="Description"
            multiline
            rows={4}
          />
        </div>
        <Button variant="contained" size="medium" color="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.backButton}
        >
          <Link
            to={vendorPath}
            className={classes.backLink}
          >{String.raw`Cancel`}</Link>
        </Button>
      </form>
    </div>
  );
}
