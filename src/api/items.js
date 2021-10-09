import { backendAPI } from '../env';
const defaultValues = {
  code: "string",
  name: "string",
  description: "string",
  image_url: "string",
  unit_size: 0,
  unit: 0,
  min_order_qty: 0,
  max_order_qty: 0,
  min_purchase_price: 0,
  max_purchase_price: 0,
  default_currency: "string",
  preferred_vendor: 0,
  timestamp: "string"

};
export const getItems = async () => {
  // return { success: true, data: mockData };
  try {
    const response = await fetch(`${backendAPI}/items/`, {
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

export const createItems = async (data) => {
  try {
    const response = await fetch(`${backendAPI}/items`, {
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

export const updateItems = async (data, id) => {
  try {
    const response = await fetch(`${backendAPI}/items/${id}`, {
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

export const deleteItems = async (id) => {
  // return { success: true, data: mockData };
  try {
    const response = await fetch(`${backendAPI}/items/${id}`, {
      method: 'DELETE',
    });

    return {
      success: response.status >= 200 && response.status <= 300,
    };
  } catch (error) {
    return { success: false };
  }
};
