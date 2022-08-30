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
  FormHelperText,
  VStack,
  Container,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { hasCookie, getCookie } from "cookies-next";

const LogInValidationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LogIn = () => {
  const toast = useToast();
  const router = useRouter();
  const handleCreateAccount = () => {
    // router.push("/register");
  };
  const handleLogIn = async (values) => {
    // router.push("/dashboard");
  };

  return (
    <>
      <Flex minH="100vh" align={"center"} justify={"center"} minW="100vh">
        <VStack justify={"space-between"} spacing={6} minW="60%">
          <Text fontSize="4xl">Log In</Text>
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            validationSchema={LogInValidationSchema}
            onSubmit={handleLogIn}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl
                  isInvalid={
                    Boolean(errors.usernameOrEmail) &&
                    Boolean(touched.usernameOrEmail)
                  }
                >
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
                  <Field
                    name="password"
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
          <Text fontSize="4xl">Register</Text>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={RegisterValidationSchema}
            onSubmit={handleCreateAccount}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl
                  isInvalid={
                    Boolean(errors.username) && Boolean(touched.username)
                  }
                >
                  <Field
                    name="username"
                    as={Input}
                    placeholder="Username"
                    m="5%"
                  />
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.email) && Boolean(touched.email)}
                >
                  <Field name="email" as={Input} placeholder="Email" m="5%" />
                </FormControl>
                <FormControl
                  isInvalid={
                    Boolean(errors.password) && Boolean(touched.password)
                  }
                >
                  <Field
                    name="password"
                    as={Input}
                    placeholder="Password"
                    m="5%"
                  />
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
              </Form>
            )}
          </Formik>
        </VStack>
      </Flex>
      asd
    </>
  );
};

export default LogIn;
