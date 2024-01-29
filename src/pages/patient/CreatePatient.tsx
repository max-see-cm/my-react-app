import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function CreatePatient() {
  async function fetchPatientDetails() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v3/t`
    );
    return data;
  }

  const useTitle = useQuery(["title"], fetchPatientDetails, {
    onSuccess(data) {
      console.log("data usetitle", data);
    },
  });

  async function fetchGenderList() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v3/gender`
    );
    return data;
  }

  const useGender = useQuery(["gender"], fetchGenderList, {
    onSuccess(data) {
      console.log("data usegender", data);
    },
  });

  return <div>CreatePatient</div>;
}

export default CreatePatient;
