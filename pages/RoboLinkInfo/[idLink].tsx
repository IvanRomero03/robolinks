import {
  Flex,
  Box,
  Container,
  Button,
  Image,
  Code,
  Text,
  Heading,
  VStack,
  Link,
  HStack,
  Badge,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { TopNavBar } from "../../components/Layout/TopNavBar";
import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import { CopyIcon } from "@chakra-ui/icons";

const LinkPage = () => {
  const router = useRouter();
  const { idLink } = router.query;
  const { data, isLoading, error } = useQuery(["link", idLink], () =>
    client.get(`/Link/getLink?idLink=${idLink}`)
  );

  const autor = useQuery(["autor", data?.data?.idUser], () =>
    client.get(`/User/getUser?idUser=${data?.data?.idUser}`)
  );

  useEffect(() => {
    if (error) {
      router.push("/");
    }
  }, [error]);
  return (
    <>
      <VStack>
        <TopNavBar />
        <Container
          minW="100%"
          padding={isMobile ? "3.5rem" : "3rem"}
          background={"gray.700"}
          backdropBlur={"sm"}
          opacity={0}
        ></Container>
      </VStack>
      <HStack align={"flex-start"} m="5%" spacing={8}>
        <VStack>
          <Image
            src={data?.data?.picUrl}
            alt={data?.data?.title}
            borderRadius="20%"
            border={"2px"}
            boxSize="400px"
            minH={"400px"}
            minW={"400px"}
          />
        </VStack>
        <VStack align={"left"} m="5%" spacing={4} minW="60%" minH="60%">
          <Heading>{data?.data?.title}</Heading>
          {/** Author info */}
          <HStack>
            <Avatar
              size={"md"}
              name={autor?.data?.data?.username}
              src={autor?.data?.data?.picUrl}
            />
            <Code fontSize={"lg"}>{autor?.data?.data?.username}</Code>
          </HStack>
          <HStack>
            <Link href={data?.data?.url} isExternal>
              <Code>
                rbrgs.com/
                {data?.data?.short?.replaceAll(" ", "%20")}
              </Code>
            </Link>
            <IconButton
              aria-label="Copy link"
              icon={<CopyIcon />}
              onClick={() => {
                navigator.clipboard.writeText(
                  `rbrgs.com/${data?.data?.short?.replaceAll(" ", "%20")}`
                );
              }}
            />
          </HStack>
          <Box w={"100%"} border="2px" minH="60%" padding={"3rem"} maxH="60%">
            <Text>{data?.data?.description}</Text>
          </Box>
          <Link>
            <Text>{data?.data?.url}</Text>
          </Link>
          <HStack mt="2%" mb="2%" alignSelf={"flex-start"}>
            {data?.data?.tags.map((tag) => (
              <Badge key={tag?.Tag?.idTag} colorScheme={tag?.Tag?.tagColor}>
                {tag?.Tag?.tagName}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </HStack>
    </>
  );
};

export default LinkPage;
