import axios, { AxiosError } from 'axios';
import { ERPSystem } from '../types/settings';

const API_BASE_URL = 'https://preprod-api.myinvois.hasil.gov.my';

export const getERPToken = async (erpSystem: ERPSystem): Promise<ERPTokenResponse> => {
  try {
    const formData = new URLSearchParams({
      client_id: erpSystem.clientId,
      client_secret: erpSystem.clientSecret1,
      grant_type: 'client_credentials',
      scope: 'InvoicingAPI'
    });


    const response = await axios.post<ERPTokenResponse>(
      `${API_BASE_URL}/connect/token`,
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError with response details
      const apiError = error as AxiosError<ERPErrorResponse>;
      console.error('API Error:', {
        message: apiError.message,
        status: apiError.response?.status,
        data: apiError.response?.data
      });

      // Throw simplified serializable error
      throw {
        message: apiError.message,
        status: apiError.response?.status,
        errorData: apiError.response?.data
      };
    } else {
      // Handle unexpected errors
      console.error('Unexpected Error:', error);
      throw error;
    }
  }
};
