import { HStack, Box, Container } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import client from "../../client";
import { VictoryChart, VictoryBar, VictoryPie } from "victory";
import { useEffect, useState } from "react";

const VisitsHistogram = ({ idLink }) => {
  const { data, isLoading, isError } = useQuery(
    ["visitsByCountry", idLink],
    async () => await client.get(`/Visit/getVisitsByCountry?idLink=${idLink}`)
  );

  const [countryArray, setCountryArray] = useState([]);

  useEffect(() => {
    if (data) {
      const countries = data.data.map((visit) => {
        return {
          y: visit._count._all,
          x: visit.country,
          label: visit.country + ": " + visit._count._all,
        };
      });
      setCountryArray(countries);
    }
  }, [data]);

  return (
    <Container>
      <HStack>
        <Box>
          <VictoryPie data={countryArray} colorScale="qualitative" />
        </Box>
      </HStack>
    </Container>
  );
};

export default VisitsHistogram;
