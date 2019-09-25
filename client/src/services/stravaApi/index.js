import axios from 'axios';

export const getSegmentStats = async (accessToken) => {
  const stravaApiUrl = process.env.REACT_APP_STRAVA_API_URL;

  const response = await axios.get(`${stravaApiUrl}/api/v3/segments/starred`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.map(({
    id,
    name,
    athlete_pr_effort: athletePrEffort,
    distance,
    elevation_high: elevationHigh,
    elevation_low: elevationLow,
  }) => ({
    id,
    name,
    personalRecord: athletePrEffort.elapsed_time,
    // ranking: null,
    // athleteCount: null,
    // timeFromKom: null,
    distance,
    elevationGain: elevationHigh - elevationLow,
    // top3Athletes: [],
  }));
};
