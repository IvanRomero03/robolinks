import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Button, IconButton, Image, Text } from "@chakra-ui/react";

function handleLogin(instance) {
  instance.loginPopup(loginRequest).catch((e) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    const loginResponse = await instance.loginPopup(loginRequest);
    console.log(loginResponse.account.username);
  };

  return (
    <>
      <Button variant="outline" onClick={handleLogin}>
        <Image
          src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
          alt="Microsoft Logo"
          boxSize={"22px"}
          maxBlockSize={"22px"}
          maxInlineSize={"22px"}
        />
        <Text m="2%">Sign in or Register. (@tec.mx)</Text>
      </Button>
    </>
  );
};

const MSALPage = () => {
  return (
    <div>
      <h1>MSAL Page</h1>
      <SignInButton />
    </div>
  );
};

export default MSALPage;
