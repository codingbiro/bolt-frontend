/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "User";
  id: string;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  data: RegisterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
