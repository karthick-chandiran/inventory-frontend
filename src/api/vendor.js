import { backendAPI } from '../env';
const defaultValues = {
  code: 'string',
  name: 'Jega1',
  description: 'string',
  contact_person: 'string',
  address_1: 'string',
  address_2: 'string',
  pin_code: 0,
  city: 'string',
  state: 'string',
  country: 'string',
  vendor: 'string',
  timezone: 'string',
  phone_no_1: 0,
  phone_no_2: 0,
  fax_no: 0,
  pan_number: 0,
  gst_number: 0,
  email_id: 'string',
  alternate_email_id: 'string',
  ts: 'string',
  bank_name: 'string',
  branch: 'string',
  account_name: 'string',
  account_no: 0,
  IFSC_code: 'string',
};
export const getVendors = async () => {
  // return { success: true, data: mockData };
  try {
    const response = await fetch(`${backendAPI}/vendor/`, {
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

export const createVendor = async (data) => {
  try {
    const response = await fetch(`${backendAPI}/vendor`, {
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

export const updateVendor = async (data, id) => {
  try {
    const response = await fetch(`${backendAPI}/vendor/${id}`, {
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

export const deleteVendor = async (id) => {
  // return { success: true, data: mockData };
  try {
    const response = await fetch(`${backendAPI}/vendor/${id}`, {
      method: 'DELETE',
    });

    return {
      success: response.status >= 200 && response.status <= 300,
    };
  } catch (error) {
    return { success: false };
  }
};
