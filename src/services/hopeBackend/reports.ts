import { AxiosInstance } from 'axios';
import { hopeBackendUrl } from './url';

export async function countsReport(axios: AxiosInstance) {
  const res = await axios.get<{
    count: {
      animal: number;
      adopter: number;
      adoption: number;
    };
  }>(hopeBackendUrl.reports.counts);
  return res.data;
}
