import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box } from '@chakra-ui/react';

function App() {
  const url = `/GXvPAor1ifNfpF0U5PTG0w`;
  const url2 = `ohGSnJtMIC5nPfYRi_HTAg`;

  const [fetchURL, setFetchURL] = useState(url);

  const getPlace = async ({ queryKey }) => {
    const [_, param] = queryKey;
    const response = await fetch(param).then((res) => res.json());

    return response;
  };

  const { isLoading, error, data, refetch } = useQuery(['place', fetchURL], getPlace);

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

  return (
    <Tabs onChange={handleChange}>
      <TabList>
        <Tab>Casa Ferlin</Tab>
        <Tab>Le Cafe du Marche</Tab>
      </TabList>
      <TabPanels>
        <TabPanel textAlign='left'>
          <Text>Name: {data?.displayed_what}</Text>
          <Text pb={1}>Address: {data?.displayed_where}</Text>
          <Text pb={1} fontSize='lg'>
            Opening Hours
          </Text>
          <Box>
            <Box pb={2}>
              Monday - Friday:{' '}
              {data?.opening_hours?.days?.monday?.map((hour, idx) => {
                return (
                  <Text key={idx}>
                    {hour?.start} - {hour?.end}
                  </Text>
                );
              })}
            </Box>

            <Box pb={2}>Saturday - Sunday: closed</Box>
          </Box>
        </TabPanel>
        <TabPanel textAlign='left'>
          <Text>Name: {data?.displayed_what}</Text>
          <Text pb={1}>Address: {data?.displayed_where}</Text>
          <Text fontSize='lg' pb={1}>
            Opening Hours
          </Text>
          <Box pb={2}>
            <Text pb={2}>Monday: closed</Text>
            Tuesday - Friday :{' '}
            {data?.opening_hours?.days?.tuesday?.map((hour, idx) => {
              return (
                <Text key={idx}>
                  {hour?.start} - {hour?.end}
                </Text>
              );
            })}
          </Box>

          <Box pb={2}>
            Saturday:{' '}
            {data?.opening_hours?.days?.saturday?.map((hour, idx) => {
              return (
                <Text key={idx}>
                  {hour?.start} - {hour?.end}
                </Text>
              );
            })}
          </Box>
          <Box pb={2}>
            Sunday:{' '}
            {data?.opening_hours?.days?.sunday?.map((hour, idx) => {
              return (
                <Text key={idx}>
                  {hour?.start} - {hour?.end}
                </Text>
              );
            })}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
