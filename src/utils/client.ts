import { LiveCategory } from "./enums";

export class Client {
  constructor() { }

  getLivesByCategory(category: string) {
    let data: any[] = [];

    // mock data, will be replaced by api implementation
    switch (category) {
      case LiveCategory.OnSchedule:
        data = [
          {
            id: 1,
            title: 'live stream 1',
            status: 'on-schedule',
            image: ''
          }
        ];
        break;
      case LiveCategory.Live:
        data = [
          {
            id: 2,
            title: 'live stream 2',
            status: 'live',
            image: ''
          }
        ];
        break;
      case LiveCategory.Finished:
        data = [
          {
            id: 3,
            title: 'live stream 3',
            status: 'finished',
            image: ''
          }
        ];
        break;
      case LiveCategory.Canceled:
        data = [
          {
            id: 4,
            title: 'live stream 4',
            status: 'canceled',
            image: ''
          }
        ];
        break;
    }

    return data;
  }
}

export default new Client();
