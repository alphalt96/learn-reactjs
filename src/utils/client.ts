import { LiveCategory } from "./enums";
import Envs from './env';

export class Client {
  constructor(
    private readonly API_ENDPOINT = Envs.API_ENDPOINT || ''
  ) { }

  async verifyToken(credential: string) {
    const response = await fetch(
      `${this.API_ENDPOINT}/verify-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credential
        })
      }
    );

    const payload = await response.json();
    
    return payload;
  }

  async getLivesByCategory(category: LiveCategory, pageIndex: number, pageSize: number) {
    let data: any[] = [];
    const query = new URLSearchParams({
      category,
      pageIndex: `${pageIndex}`,
      pageSize: `${pageSize}`
    });

    const response = await fetch(
      `${this.API_ENDPOINT}/lives?${query.toString()}`,
      {
        method: 'GET'
      }
    );

    const responseData = await response.json();

    return {
      data: responseData.data,
      pagination: responseData.pagination
    };
  }
}

export default new Client();
