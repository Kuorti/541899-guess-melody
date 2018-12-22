const STATISTICS_SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = `548034`;
const EMPTY_RESULTS = [];

export default class Loader {
  static loadData() {
    return fetch(`${STATISTICS_SERVER_URL}/questions`)
      .then((response) => {
        return response.json();
      });
  }

  static loadResults() {
    return fetch(`${STATISTICS_SERVER_URL}/stats/${APP_ID}`)
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        return EMPTY_RESULTS;
      });
  }

  static sendResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${STATISTICS_SERVER_URL}/stats/${APP_ID}`, requestSettings);
  }
}
