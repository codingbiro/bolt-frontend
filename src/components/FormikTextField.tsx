import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React, { useCallback } from "react";
import { fade, FormControlLabel, makeStyles } from "@material-ui/core";
import { useFormikContext } from "formik";
import cn from "classnames";

function objectPropertyByString<T>(
  object: Record<string, unknown>,
  propertyString: string
): T | undefined {
  try {
    return propertyString
      .split(".")
      .reduce(
        (objectLevel, index) => objectLevel[index] as Record<string, unknown>,
        object
      ) as T;
  } catch {
    return undefined;
  }
}

const useStyles = makeStyles(() => ({
  red: {
    color: "red",
  },
  form: {
    width: "100%",
    marginTop: "24px",
  },
  submit: {
    marginTop: "24px",
  },
  label: {
    width: "100%",
    alignItems: "flex-start",
    margin: 0,
    "& .MuiFormControlLabel-label": {
      paddingBottom: "8px",
      fontSize: "12px",
      fontWeight: "600",
      "&.Mui-disabled": {
        color: fade("#000", 0.4),
      },
    },
    "&.no-label  .MuiFormControlLabel-label": {
      padding: 0,
    },
  },
  field: {
    height: "40px",
    width: "100%",
    minWidth: "40px",
    borderRadius: "16px",
    "& .MuiInputBase-root, &.MuiInputBase-root": {
      height: "40px",
      "& input": {
        paddingTop: 0,
        paddingBottom: 0,
        height: "40px",
        borderRadius: "16px",
        border: 0,
        fontSize: "14",

        "&.Mui-disabled": {
          background: fade("#9ea18f", 0.1),
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        height: "40px",
        top: 0,
        "& legend": {
          display: "none",
        },
      },
      "&:not(.Mui-focused):not(.Mui-error)": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#9ea18f",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#6c6e65",
        },
      },
    },
  },
  error: {
    paddingTop: "8px",
    color: "red",
    fontWeight: "bold",
  },
}));

type Props = Omit<TextFieldProps, "name"> & {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
};

const FormikTextField: React.FC<Props> = ({
  label: _label,
  name,
  onChange,
  required,
  className,
  ...propsToPass
}) => {
  const classes = useStyles();
  const formikContext = useFormikContext<Record<string, unknown>>();
  if (formikContext === undefined)
    throw new Error(
      "Cannot get Formik context. Have you use the AppTextField as child of a <Formik> component?"
    );

  const { values, setFieldValue, touched, errors } = formikContext;

  let value = objectPropertyByString(values, name);
  if (value === null || value === undefined) value = "";

  const label = useCallback(() => {
    return _label && required ? `${_label}*` : _label;
  }, [_label, required]);

  return (
    <div>
      <FormControlLabel
        labelPlacement="top"
        className={cn(classes.label, { "no-label": !label() })}
        label={label()}
        control={
          <TextField
            {...propsToPass}
            name={name}
            value={value}
            required={required}
            variant="outlined"
            error={
              objectPropertyByString(touched, name) &&
              !!objectPropertyByString(errors, name)
            }
            onChange={(event) => {
              const newValue = event.target.value;
              setFieldValue(name, newValue);
              if (onChange) {
                onChange(newValue);
              }
            }}
            className={cn(className, classes.field)}
          />
        }
      />

      <div className={classes.error}>
        {objectPropertyByString(touched, name)
          ? objectPropertyByString(errors, name)
          : undefined}
      </div>
    </div>
  );
};

export default FormikTextField;
