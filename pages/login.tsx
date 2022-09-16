import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import client from "../client";
import {
  Input,
  Button,
  Text,
  Box,
  useToast,
  FormControl,
  FormErrorMessage,
  VStack,
  Container,
  Flex,
  HStack,
  Image,
  FormLabel,
  Avatar,
} from "@chakra-ui/react";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { TopNavBar } from "../components/Layout/TopNavBar";
import { isMobile } from "react-device-detect";
import { supabase } from "../supabase";

const LogInValidationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const isEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const LogIn = () => {
  const toast = useToast();
  const router = useRouter();
  const handleCreateAccount = async (values) => {
    const { username, email, password, picUrl } = values;
    if (values.picUrl.substring(0, 4) == "data") {
      const reader = new FileReader();
      const base64 = await fetch(values.picUrl);
      const blob = await base64.blob();
      const supabaseImagesNumber = await supabase.storage
        .from("imagenes")
        .list("RoboLinks");
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
    const response = await client.post("/User/createValidUser", {
      username: username,
      email: email,
      password: password,
      picUrl: picUrl,
    });
    if (response.status === 200) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        isClosable: true,
      });
      setCookie("RoboLinks", response.data.idUser);
      router.push("/");
    } else {
      toast({
        title: response.data.title,
        description: response.data.message,
        status: "error",
        isClosable: true,
      });
    }
  };
  const handleLogIn = async (values) => {
    if (isEmail(values.usernameOrEmail)) {
      const response = await client.post("/User/validateLogInEmail", {
        email: values.usernameOrEmail,
        password: values.password,
      });
      if (response.data.length == 1) {
        setCookie("RoboLinks", response.data[0].idUser, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
        router.push("/");
      } else {
        toast({
          title: "Invalid credentials.",
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      const response = await client.post("/User/validateLogInUsername", {
        username: values.usernameOrEmail,
        password: values.password,
      });
      if (response.data.length == 1) {
        setCookie("RoboLinks", response.data[0].idUser, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
        router.push("/");
      } else {
        toast({
          title: "Invalid credentials.",
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

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
      <Flex align={"center"} justify={"center"} m="5%">
        <HStack justify={"space-between"} spacing={6} w="80%">
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            validationSchema={LogInValidationSchema}
            onSubmit={handleLogIn}
          >
            {({ errors, touched }) => (
              <Form>
                <Text fontSize="4xl" align={"center"}>
                  Log In
                </Text>
                <FormControl
                  isInvalid={
                    Boolean(errors.usernameOrEmail) &&
                    Boolean(touched.usernameOrEmail)
                  }
                >
                  <FormLabel>Username or email.</FormLabel>
                  <Field
                    name="usernameOrEmail"
                    as={Input}
                    placeholder="Username or email"
                    m="5%"
                  />
                  <FormErrorMessage>
                    <ErrorMessage name="usernameOrEmail" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    Boolean(errors.password) && Boolean(touched.password)
                  }
                >
                  <FormLabel>Password</FormLabel>
                  <Field
                    name="password"
                    type="password"
                    as={Input}
                    placeholder="Password"
                    m="5%"
                  />

                  <FormErrorMessage>
                    <ErrorMessage name="password" />
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="teal"
                  m="5%"
                  w="100%"
                  variant={"outline"}
                >
                  Log In
                </Button>
              </Form>
            )}
          </Formik>
          <Text fontSize="4xl" align={"center"}>
            Or
          </Text>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              picUrl: "",
            }}
            validationSchema={RegisterValidationSchema}
            onSubmit={handleCreateAccount}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <HStack spacing={8}>
                  <VStack>
                    <Text fontSize="4xl">Register</Text>
                    <FormControl
                      isInvalid={
                        Boolean(errors.username) && Boolean(touched.username)
                      }
                    >
                      <FormLabel>Username</FormLabel>
                      <Field
                        name="username"
                        as={Input}
                        placeholder="Username"
                        m="5%"
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="username" />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        Boolean(errors.email) && Boolean(touched.email)
                      }
                    >
                      <FormLabel>Email</FormLabel>
                      <Field
                        name="email"
                        as={Input}
                        placeholder="Email"
                        m="5%"
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="email" />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
                    >
                      <FormLabel>Password</FormLabel>
                      <Field
                        name="password"
                        type="password"
                        as={Input}
                        placeholder="Password"
                        m="5%"
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="password" />
                      </FormErrorMessage>
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="teal"
                      m="5%"
                      w="100%"
                      variant={"outline"}
                    >
                      Create Account
                    </Button>
                  </VStack>
                  <FormControl>
                    <HStack>
                      <FormLabel>Profile Picture</FormLabel>
                      <Text fontSize="sm" m="2%">
                        (optional)
                      </Text>
                    </HStack>
                    <VStack m="5%">
                      <Avatar
                        src={
                          values?.picUrl ?? "" //if picUrl is null, then show a default image
                        }
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
                  </FormControl>
                </HStack>
              </Form>
            )}
          </Formik>
        </HStack>
      </Flex>
    </>
  );
};

export default LogIn;
