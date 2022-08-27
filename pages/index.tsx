import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import client from "../client";
import { TopNavBar } from "../components/Layout/TopNavBar";
import { LinkComponent } from "../components/Link/LinkComponent";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import LinkStack from "../components/Link/linkStack";
import SearchBar from "../components/Searcher/SearchBar";
// idea https://excalidraw.com/#json=myQ7PbofUoi1ufoU6SZ65,jLB2YW1xcTTW4qktRK4V1w

export default function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  console.log(search);
  console.log(tags);

  return (
    <>
      <VStack>
        <TopNavBar />
        <Container
          minW="100%"
          padding={"3rem"}
          background={"gray.700"}
          backdropBlur={"sm"}
          opacity={0}
        ></Container>
      </VStack>
      <VStack m="2%">
        <SearchBar setSearch={setSearch} setTags={setTags} search={search} />
      </VStack>
      <LinkStack search={search} tags={tags} />
      <VStack m="2%">
        <HStack></HStack>
      </VStack>
    </>
  );
}
