import axios from "axios";

export const createCheckout = async (data) => {
  try {
    const URL = `${window.location.origin}/api/stripe/checkout`;
    return await axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};

export const getSuccess = async (data) => {
  try {
    const URL = `${window.location.origin}/api/stripe/success?id=${data.id}`;
    return await axios.get(URL, data);
  } catch (err) {
    console.error(err);
  }
};
