import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getSegmentStats } from '../../services/stravaApi';

const Table = styled.table`
  max-width: 1300px;
  width: 70%;
  margin: 30px auto;
`;

const TextTh = styled.th`
  text-align: left;
`;

const NumberTh = styled.th`
  text-align: right;
`;

const TextTd = styled.td`
  text-align: left;
`;

const NumberTd = styled.td`
  text-align: right;
`;

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
    <Table>
      <thead>
        <tr>
          <TextTh>Segment</TextTh>
          <NumberTh>My PR</NumberTh>
          <NumberTh>My Ranking</NumberTh>
          <NumberTh>Total ANumberThletes</NumberTh>
          <NumberTh>Time from KOM</NumberTh>
          <NumberTh>Distance</NumberTh>
          <NumberTh>Elevation Gain</NumberTh>
          <TextTh>Top 3</TextTh>
        </tr>
      </thead>
      <tbody>
        {segments && segments.map((segment) => (
          <tr key={segment.id}>
            <TextTd>{segment.name}</TextTd>
            <NumberTd>{segment.personalRecord}</NumberTd>
            <NumberTd>{segment.ranking}</NumberTd>
            <NumberTd>{segment.athleteCount}</NumberTd>
            <NumberTd>{segment.timeFromKom}</NumberTd>
            <NumberTd>{segment.distance}</NumberTd>
            <NumberTd>{segment.elevationGain}</NumberTd>
            <TextTd>{segment.topThreeAthletes}</TextTd>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

SegmentsList.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default SegmentsList;
