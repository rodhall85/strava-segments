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
    <ul>
      {segments && segments.map((segment) => (
        <li key={segment.id}>
          <span className="segment-name">{segment.name}</span>
          <span className="pr">{segment.personalRecord}</span>
          <span className="ranking">{segment.ranking}</span>
          <span className="athlete-count">{segment.athleteCount}</span>
          <span className="time-from-kom">{segment.timeFromKom}</span>
          <span className="distance">{segment.distance}</span>
          <span className="elevation-gain">{segment.elevationGain}</span>
        </li>
      ))}
    </ul>
  );
};

SegmentsList.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default SegmentsList;
