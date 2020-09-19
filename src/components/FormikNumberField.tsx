import React from "react";
import { useFormikContext } from "formik";
import FormikTextField, { Props as TextFieldProps } from "./FormikTextField";

type Props = Omit<Omit<Omit<TextFieldProps, "type">, "onChange">, "value"> & {
  onChange?: (value: number | null) => void;
};

const FormikNumberField: React.FC<Props> = ({
  onChange,
  name,
  ...propsToPass
}) => {
  const formContext = useFormikContext<Record<string, unknown>>();

  return (
    <FormikTextField
      name={name}
      type="number"
      {...propsToPass}
      onChange={(newValue: string) => {
        let newValueFloat: number | null = parseFloat(newValue);
        if (Number.isNaN(newValueFloat)) {
          newValueFloat = null;
        }
        formContext.setFieldValue(name, newValueFloat);

        if (onChange) {
          onChange(newValueFloat);
        }
      }}
    />
  );
};

export default FormikNumberField;
