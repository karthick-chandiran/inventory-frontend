import { backendAPI } from "../env";
const mockData = [
  {
    id: 1,
    address_2: "string",
    timezone: "string",
    contact_person: "string",
    gst_number: 0,
    account_no: 0,
    country: "string",
    bank_name: "string",
    account_name: "string",
    branch: "string",
    pan_number: 0,
    vendor: "string",
    phone_no_1: 0,
    pin_code: 0,
    fax_no: 0,
    state: "string",
    ts: "string",
    name: "Jega",
    phone_no_2: 0,
    address_1: "string",
    code: "001",
    city: "string",
    IFSC_code: "string",
    email_id: "string",
    description: "string",
    alternate_email_id: "string"
  },
  {
    id: 2,
    address_2: "string",
    timezone: "string",
    contact_person: "11111111",
    gst_number: 0,
    account_no: 0,
    country: "string",
    bank_name: "string",
    account_name: "string",
    branch: "string",
    pan_number: 0,
    vendor: "string",
    phone_no_1: 0,
    pin_code: 0,
    fax_no: 0,
    state: "string",
    ts: "string",
    name: "Karthick",
    phone_no_2: 0,
    address_1: "Chennai",
    code: "string",
    city: "string",
    IFSC_code: "string",
    email_id: "string",
    description: "string",
    alternate_email_id: "string"
  },
  {
    id: 3,
    address_2: "string",
    timezone: "string",
    contact_person: "11111111",
    gst_number: 0,
    account_no: 0,
    country: "string",
    bank_name: "string",
    account_name: "string",
    branch: "string",
    pan_number: 0,
    vendor: "string",
    phone_no_1: 0,
    pin_code: 0,
    fax_no: 0,
    state: "string",
    ts: "string",
    name: "Karthick1",
    phone_no_2: 0,
    address_1: "Chennai",
    code: "string",
    city: "string",
    IFSC_code: "string",
    email_id: "string",
    description: "string",
    alternate_email_id: "string"
  }
];

export const getVendors = async () => {
  return { success: true, data: mockData };
  try {
    const response = await fetch(`${backendAPI}/vendor`, {
      method: "GET",
      headers: {
        // "Access-Control-Allow-Origin": backendAPI
      }
    });

    return {
      success: response.status >= 200 && response.status <= 300,
      data: response.json()
    };
  } catch (error) {
    return { success: false };
  }
};

export const createVendor = async (data) => {
  try {
    const response = await fetch(`${backendAPI}/vendor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return {
      success: response.status >= 200 && response.status <= 300,
      data: response.json()
    };
  } catch (error) {
    return { success: false };
  }
};
