import { backendAPI } from '../env';
const defaultValues = {
  code: "string",
  agency_name: "string",
  contact_person: "string",
  address_1: "string",
  address_2: "string",
  pin_code: 0,
  city: "string",
  state: "string",
  country: "string",
  timezone: "string",
  phone_no_1: 0,
  phone_no_2: 0,
  fax_no: 0,
  pan_number: 0,
  gst_number: 0,
  email_id: "string",
  alternate_email_id: "string",
  status_enum: "string",
  ts: "string"

};
export const getCustomer = async () => {
  // return { success: true, data: mockData };
  try {
    const response = await fetch(`${backendAPI}/customer/`, {
      method: 'GET',
    });

    return {
      success: response.status >= 200 && response.status <= 300,
      data: await response.json(),
    };
  } catch (error) {
    return { success: false };
  }
};

export const createCustomer = async (data) => {
  try {
    const response = await fetch(`${backendAPI}/customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    return {
      success: response.status >= 200 && response.status <= 300,
      data: response.json(),
    };
  } catch (error) {
    return { success: false };
  }
};

export const updateCustomer = async (data, id) => {
  try {
    const response = await fetch(`${backendAPI}/customer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    return {
      success: response.status >= 200 && response.status <= 300,
      data: response.json(),
    };
  } catch (error) {
    return { success: false };
  }
};

export const deleteCustomer = async (id) => {
  // return { success: true, data: mockData };
  try {
    const response = await fetch(`${backendAPI}/customer/${id}`, {
      method: 'DELETE',
    });

    return {
      success: response.status >= 200 && response.status <= 300,
    };
  } catch (error) {
    return { success: false };
  }
};
