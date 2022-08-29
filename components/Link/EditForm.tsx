import {
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Button,
  Heading,
  IconButton,
  Spacer,
  HStack,
  VStack,
  Image,
  Code,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Text,
  Center,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import client from "../../client";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

type props = {
  idLink?: number;
  onClose: () => void;
  onSubmit: (values: any) => void;
};

const EditForm = ({ idLink, onClose, onSubmit }: props) => {
  const [selectedTags, setSelectedTags] = useState(new Set() as Set<number>);
  const [isSelected, setIsSelected] = useState({});

  const tagsQuery = useQuery(["tags"], () => client.get("/Tag/getTags"));
  console.log(tagsQuery.data);

  const { data, isLoading, isError, isFetching } = useQuery(
    ["link" + idLink],
    async () => await client.get(`Link/getLink?idLink=${idLink}`)
  );
  const mutateLink = useMutation(async (values) => {
    console.log(values);
    await client.post(`Link/editLink`, values);
  }).mutate;
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    url: Yup.string().url("Invalid url").required("Required"),
    picUrl: Yup.string().url("Invalid url"),
    description: Yup.string().max(500, "Too Long!").required("Required"), //change required here and in the backend
  });
  console.log(data);
  console.log(selectedTags);
  useEffect(() => {
    if (data) {
      setSelectedTags(new Set(data?.data?.tags.map((tag) => tag.Tag.idTag)));
    }
  }, [data]);

  return (
    <ModalContent minW="60%" minH="40%">
      <ModalBody>
        <Formik
          initialValues={
            idLink
              ? data?.data
              : {
                  title: "",
                  url: "",
                  picUrl: "",
                  description: "",
                }
          }
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            values.idLink = idLink;
            mutateLink(values);
            onSubmit(values);
            setSubmitting(false);
            onClose();
          }}
        >
          <Form>
            <VStack minW="100%" w="90%" alignItems={"flex-start"}>
              <HStack justify={"space-between"} m="2.5%" w="30%">
                <VStack
                  w="100%"
                  h="100%"
                  justify={"space-between"}
                  align={"flex-start"}
                  mr="2%"
                >
                  <Image
                    src={data?.data?.picUrl}
                    alt="logo"
                    boxSize="150px"
                    borderRadius={"10%"}
                    shadow={"outline"}
                  />
                  <Field name="picUrl" as={Input} placeholder="Image Url" />
                  <input type="file" name="file" />
                </VStack>
                <VStack minW="210%" h="100%" alignItems={"self-start"}>
                  <HStack w="100%" justify={"space-between"}>
                    <Code>
                      <Heading size="md">Title</Heading>
                    </Code>
                    <IconButton
                      aria-label="Close"
                      icon={<CloseIcon />}
                      onClick={onClose}
                    />
                  </HStack>
                  <Field name="title" as={Input} placeholder="Title" />
                  <Code>
                    <Heading size="md">Url</Heading>
                  </Code>
                  <Field name="url" as={Input} placeholder="Url" />
                  <Code>
                    <Heading size="md">Description</Heading>
                  </Code>
                  <Field
                    name="description"
                    as={Textarea}
                    placeholder="Description"
                  />
                  <Code>
                    <Heading size="md">Tags</Heading>
                  </Code>
                  <HStack>
                    <Button colorScheme="teal" size="sm">
                      Add Tag
                    </Button>
                    <Menu>
                      <MenuButton type="button">
                        <Badge colorScheme={"green"}>Tags</Badge>
                      </MenuButton>
                      <MenuList>
                        {tagsQuery?.data?.data?.map((tag) => {
                          console.log(tag);
                          return (
                            <MenuItem
                              key={tag.idTag}
                              onClick={() => {
                                setIsSelected({
                                  ...isSelected,
                                  [tag.idTag]: true,
                                });
                                selectedTags.add(tag.idTag);
                                setSelectedTags(selectedTags);
                              }}
                            >
                              <HStack justify={"space-between"}>
                                <Badge colorScheme={tag.tagColor}>
                                  {tag.tagName}
                                </Badge>
                                <Spacer />
                                {isSelected[tag.idTag] ? <CheckIcon /> : null}
                              </HStack>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>

                    {Array.from(selectedTags).map((tag) => {
                      const tagData = tagsQuery?.data?.data?.find(
                        (t) => t.idTag === tag
                      );
                      return (
                        <Badge
                          key={tagData.idTag}
                          colorScheme={tagData.tagColor}
                          onClick={() => {
                            setIsSelected({
                              ...isSelected,
                              [tagData.idTag]: false,
                            });
                            selectedTags.delete(tagData.idTag);
                            setSelectedTags(selectedTags);
                          }}
                          cursor={"pointer"}
                        >
                          <HStack>
                            <Text>{tagData.tagName}</Text>
                            <Center>
                              <CloseIcon />
                            </Center>
                          </HStack>
                        </Badge>
                      );
                    })}
                  </HStack>
                </VStack>
              </HStack>

              <HStack minW="100%" m="3%">
                <Button type="submit" colorScheme={"blue"}>
                  Submit
                </Button>{" "}
                <Spacer /> <Button onClick={onClose}>Cancel</Button>
              </HStack>
            </VStack>
          </Form>
        </Formik>
      </ModalBody>
    </ModalContent>
  );
};

export default EditForm;
