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

const convertSecondsToTime = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds - minutes * 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getSegmentStats = async (accessToken) => {
  const segmentsResponse = await getSegments(accessToken);

  const segmentsData = await Promise.all(segmentsResponse.data.map(async ({
    id,
    name,
    athlete_pr_effort: { elapsed_time: personalRecord },
    distance: dist,
    elevation_high: elevationHigh,
    elevation_low: elevationLow,
  }) => {
    const leaderboardResponse = await getLeaderboard(id, accessToken);
    const { data: { entries } } = leaderboardResponse;

    const athleteEntry = entries.find((entry) => entry.elapsed_time >= personalRecord);
    const { rank: ranking } = athleteEntry || { rank: 'Unranked' };
    const timeFromKom = `${convertSecondsToTime(personalRecord - entries[0].elapsed_time)}`;
    const distance = `${Math.round(dist).toLocaleString()}m`;
    const elevationGain = `${Math.round(elevationHigh - elevationLow).toLocaleString()}m`;

    return {
      id,
      name,
      personalRecord: convertSecondsToTime(personalRecord),
      ranking,
      athleteCount: leaderboardResponse.data.effort_count,
      timeFromKom,
      distance,
      elevationGain,
      // topThreeAthletes: leaderboardResponse.data.entries.slice(0, 3).map((athlete) => (
      //   `${athlete.athlete_name} - ${athlete.elapsed_time}s`
      // )).join('\r\n'),
    };
  }));

  return segmentsData.sort((a, b) => a.ranking - b.ranking);
};
