import { HStack, Box, Container } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import client from "../../client";
import { VictoryChart, VictoryBar, VictoryPie } from "victory";
import { useEffect, useState } from "react";

const VisitsDateHistogram = ({ idLink }) => {
  const { data, isLoading, isError } = useQuery(
    ["visitsByDate", idLink],
    async () => await client.get(`/Visit/getLast10Days?idLink=${idLink}`)
  );

  const [dateArray, setDateArray] = useState([]);

  useEffect(() => {
    if (data) {
      const dates = data.data.map((visit) => {
        return {
          y: visit._count._all,
          x: visit.createdAt,
          label: visit._count._all,
        };
      });
      setDateArray(dates);
    }
  }, [data]);

  return (
    <Container>
      <HStack>
        <Box>
          <VictoryChart>
            <VictoryBar data={dateArray} colorScale="qualitative" />
          </VictoryChart>
        </Box>
      </HStack>
    </Container>
  );
};

export default VisitsDateHistogram;
