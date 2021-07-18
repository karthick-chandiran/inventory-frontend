import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  textFieldStyles: { width: "100%" }
});

export const InventoryTextField = (props) => {
  const styles = useStyles();
  return (
    <TextField
      autoComplete={"off"}
      {...props}
      className={`${styles.textFieldStyles} ${props.className || ""}`}
      variant="outlined"
      size="small"
    />
  );
};
