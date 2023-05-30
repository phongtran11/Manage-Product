import React, { FC } from "react";
import { useParams } from "react-router";

const EditInvoice: FC = (props) => {
  const { id } = useParams();

  return <div>EditInvoice</div>;
};

export default EditInvoice;
