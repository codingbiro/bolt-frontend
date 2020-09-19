/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Products
// ====================================================

export interface Products_products {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  desc: string;
}

export interface Products {
  products: Products_products[];
}

export interface ProductsVariables {
  search?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddProduct
// ====================================================

export interface AddProduct_addProduct {
  __typename: "Product";
  id: string;
}

export interface AddProduct {
  addProduct: AddProduct_addProduct;
}

export interface AddProductVariables {
  input: ProductCreateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export interface ProductCreateInput {
  name: string;
  shortDesc?: string | null;
  desc?: string | null;
  status?: ProductStatus | null;
  quantity: number;
  price: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
