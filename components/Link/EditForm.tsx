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
import { createClient } from "@supabase/supabase-js";

type props = {
  idLink?: number;
  onClose: () => void;
  onSubmit: (values: any) => any;
};

const EditForm = ({ idLink, onClose, onSubmit }: props) => {
  const supabaseLink = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  console.log(supabaseLink, supabaseKey);
  const supabase = createClient(supabaseLink, supabaseKey);
  const [selectedTags, setSelectedTags] = useState(new Set() as Set<number>);
  const [isSelected, setIsSelected] = useState({});

  const tagsQuery = useQuery(["tags"], () => client.get("/Tag/getTags"));

  const { data, isLoading, isError, isFetching } = useQuery(
    ["link" + idLink],
    async () => await client.get(`Link/getLink?idLink=${idLink}`)
  );
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    url: Yup.string().url("Invalid url").required("Required"),
    picUrl: Yup.string(),
    description: Yup.string().max(500, "Too Long!").required("Required"), //change required here and in the backend
  });

  useEffect(() => {
    if (data) {
      setSelectedTags(new Set(data?.data?.tags.map((tag) => tag.Tag.idTag)));
    }
  }, [data]);
  // TODO form control with yup validation
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
                  picUrl:
                    "https://cdn-icons-png.flaticon.com/512/3541/3541854.png",
                  description: "",
                }
          }
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            values.idLink = idLink;
            if (values.picUrl.substring(0, 4) == "data") {
              const reader = new FileReader();
              const base64 = await fetch(values.picUrl);
              const blob = await base64.blob();
              const supabaseImagesNumber = await supabase.storage
                .from("imagenes")
                .list("RoboLinks");
              console.log(supabaseImagesNumber);
              const num = supabaseImagesNumber?.data?.length ?? 0;
              supabase.storage
                .from("imagenes")
                .upload("RoboLinks/" + num + ".png", blob);
              values.picUrl =
                process.env.NEXT_PUBLIC_SUPABASE_URL +
                "/storage/v1/object/public/imagenes/RoboLinks/" +
                num +
                ".png";
            }
            values.idUser = 1; //TODO change this
            onSubmit(values);
            setSubmitting(false);

            onClose();
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
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
                      src={
                        values?.picUrl ?? "" //if picUrl is null, then show a default image
                      }
                      alt="logo"
                      boxSize="150px"
                      borderRadius={"10%"}
                      shadow={"outline"}
                    />
                    <Field
                      name="picUrl"
                      as={Input}
                      placeholder="Image Url"
                      onChange={(e) => {
                        setFieldValue("picUrl", e.target.value);
                      }}
                    />
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = async () => {
                          setFieldValue("picUrl", reader.result);
                        };
                      }}
                    />
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
                    <HStack maxW="90%">
                      <Menu>
                        <MenuButton type="button">
                          <Badge colorScheme={"green"}>Tags</Badge>
                        </MenuButton>
                        <MenuList>
                          {tagsQuery?.data?.data?.map((tag) => {
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

                      <HStack>
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
                    </HStack>
                  </VStack>
                </HStack>

                <HStack minW="100%" m="3%">
                  <Button
                    type="submit"
                    colorScheme={"blue"}
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>{" "}
                  <Spacer /> <Button onClick={onClose}>Cancel</Button>
                </HStack>
              </VStack>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </ModalContent>
  );
};

export default EditForm;
