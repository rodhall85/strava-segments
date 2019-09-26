import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getSegmentStats } from '../../services/stravaApi';

const SegmentsList = ({ accessToken }) => {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const fetchSegments = async () => {
      const result = await getSegmentStats(accessToken);
      setSegments(result);
    };
    fetchSegments();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Segment</th>
          <th>My PR</th>
          <th>My Ranking</th>
          <th>Total Athletes</th>
          <th>Time from KOM</th>
          <th>Distance</th>
          <th>Elevation Gain</th>
          <th>Top 3</th>
        </tr>
      </thead>
      <tbody>
        {segments && segments.map((segment) => (
          <tr key={segment.id}>
            <td className="segment-name">{segment.name}</td>
            <td className="pr">{segment.personalRecord}</td>
            <td className="ranking">{segment.ranking}</td>
            <td className="athlete-count">{segment.athleteCount}</td>
            <td className="time-from-kom">{segment.timeFromKom}</td>
            <td className="distance">{segment.distance}</td>
            <td className="elevation-gain">{segment.elevationGain}</td>
            <td className="top-three-athletes">{segment.topThreeAthletes}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

SegmentsList.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default SegmentsList;
