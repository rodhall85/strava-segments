import axios from 'axios';

const getSegments = async (accessToken) => axios.get(`${process.env.REACT_APP_STRAVA_API_URL}/api/v3/segments/starred`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const getLeaderboard = async (id, accessToken) => axios.get(`${process.env.REACT_APP_STRAVA_API_URL}/api/v3/segments/${id}/leaderboard`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const getSegmentStats = async (accessToken) => {
  const segmentsResponse = await getSegments(accessToken);

  return Promise.all(segmentsResponse.data.map(async ({
    id,
    name,
    athlete_pr_effort: athletePrEffort,
    distance,
    elevation_high: elevationHigh,
    elevation_low: elevationLow,
  }) => {
    const leaderboardResponse = await getLeaderboard(id, accessToken);

    return {
      id,
      name,
      personalRecord: athletePrEffort.elapsed_time,
      // ranking: null,
      athleteCount: leaderboardResponse.data.effort_count,
      // timeFromKom: null,
      distance,
      elevationGain: elevationHigh - elevationLow,
      topThreeAthletes: leaderboardResponse.data.entries.slice(0, 3).map((athlete) => (
        `${athlete.athlete_name} - ${athlete.elapsed_time}s`
      )).join('\r\n'),
    };
  }));
};
