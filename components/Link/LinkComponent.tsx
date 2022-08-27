import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Code,
  Badge,
  Button,
  Link,
  Spacer,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import client from "../../client";

export const LinkComponent = ({ idLink }) => {
  const { data, isLoading, isError } = useQuery(["link" + idLink], () =>
    client.get(`Link/getLink?idLink=${idLink}`)
  );
  //console.log(data?.data);
  return (
    <>
      <Box
        minW="350px"
        maxW={"350px"}
        w={"full"}
        //bg={"teal.800"}
        backdropBlur={"sm"}
        boxShadow={"md"}
        rounded={"md"}
        overflow={"hidden"}
        borderWidth={2}
        dropShadow={"md"}
      >
        <Box m="2%">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <Text>Error</Text>
          ) : (
            <>
              <HStack>
                <VStack w="80px" h="80px">
                  <Image
                    src={data?.data?.picUrl}
                    alt="logo"
                    boxSize="80px"
                    borderRadius={"10%"}
                    shadow={"outline"}
                    w="full"
                  />
                </VStack>
                <VStack maxW="200px" alignItems={"left"}>
                  <Heading size="md" noOfLines={1}>
                    {data?.data?.title}
                  </Heading>
                  <Link href={data?.data?.url} isExternal w="120%">
                    <Text noOfLines={1}>{data?.data?.url}</Text>
                  </Link>
                </VStack>
                <Spacer />
                <VStack alignSelf={"flex-start"}>
                  <IconButton
                    aria-label="Edit Link"
                    icon={<EditIcon />}
                    size="sm"
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => {
                      console.log("Edit Link");
                    }}
                  />
                </VStack>
              </HStack>
              <HStack mt="2%" mb="2%" alignSelf={"flex-end"}>
                <Badge colorScheme={data?.data?.tags[0].Tag.tagColor}>
                  {data?.data?.tags[0].Tag.tagName}
                </Badge>
              </HStack>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
