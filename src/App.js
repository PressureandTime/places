import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react';
import OpeningHours from './components/OpeningHours';

function App() {
  const url = `/GXvPAor1ifNfpF0U5PTG0w`;
  const url2 = `ohGSnJtMIC5nPfYRi_HTAg`;

  const [dataFromAPI, setDataFromAPI] = useState({});

  const [fetchURL, setFetchURL] = useState(url);

  const getPlace = async ({ queryKey }) => {
    const [_, param] = queryKey;
    const response = await fetch(param).then((res) => res.json());

    return response;
  };

  const { isLoading, error, data, refetch } = useQuery(['place', fetchURL], getPlace, {
    onSuccess: (data) => {
      setDataFromAPI(data?.opening_hours?.days);
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>Error has occured</Text>;

  const handleChange = (index) => {
    if (index === 0) {
      setFetchURL(url);
    } else if (index === 1) {
      setFetchURL(url2);
    }
    refetch();
  };

  function getTheDaysThatHaveSameOpeningHours() {
    const daysAndHours = Object.entries(dataFromAPI);

    const daysWithSameHours = daysAndHours.reduce((acc, [day, hours]) => {
      const hoursString = hours?.map((hour) => `${hour.start}-${hour.end}`).join(',');
      if (acc[hoursString]) {
        acc[hoursString]?.push(day);
      } else {
        acc[hoursString] = [day];
      }
      return acc;
    }, {});

    const days = Object.values(daysWithSameHours);
    const flattenDays = days.flat();

    const daysInAWeek = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];

    const closedDays = daysInAWeek.filter((day) => !flattenDays.includes(day));

    return { daysWithSameHours, closedDays };
  }

  return (
    <Tabs onChange={handleChange}>
      <TabList>
        <Tab>Casa Ferlin</Tab>
        <Tab>Le Cafe du Marche</Tab>
      </TabList>
      <TabPanels>
        <TabPanel textAlign='left'>
          <OpeningHours
            data={Object.entries(getTheDaysThatHaveSameOpeningHours().daysWithSameHours)}
            closedDays={getTheDaysThatHaveSameOpeningHours().closedDays}
            name={data?.displayed_what}
            address={data?.displayed_where}
          />
        </TabPanel>
        <TabPanel textAlign='left'>
          <OpeningHours
            data={Object.entries(getTheDaysThatHaveSameOpeningHours().daysWithSameHours)}
            closedDays={getTheDaysThatHaveSameOpeningHours().closedDays}
            name={data?.displayed_what}
            address={data?.displayed_where}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
