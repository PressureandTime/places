import React from 'react';
import { Text, Box } from '@chakra-ui/react';

const OpeningHours = ({ data, closedDays, name, address }) => {
  return (
    <div>
      <Text>Name: {name}</Text>
      <Text>Address: {address}</Text>

      <Box pb={2}>
        {data?.map(([hours, days], idx) => {
          return (
            <Text key={idx}>
              {days.join(', ')}: {hours}
            </Text>
          );
        })}
      </Box>

      <Text color='red'>Closed on:</Text>
      {closedDays?.map((day, idx) => {
        return (
          <Text key={idx} color='red'>
            {day}
          </Text>
        );
      })}
    </div>
  );
};

export default OpeningHours;
