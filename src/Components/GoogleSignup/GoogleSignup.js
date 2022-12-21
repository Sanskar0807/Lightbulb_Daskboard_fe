import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function GoogleSignup() {
  const clientId =
    "589378485445-b7htdtu42c8gqg2s3on5pkm0hkisgq2r.apps.googleusercontent.com";


  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const onSuccess = (res) => {
    console.log("success:", res);

  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        accessType="offline"
        // scope="offline_access"
        prompt="consent"
        scope= 'https://www.googleapis.com/auth/calendar'
        
        
      />
      
    </>
  );
}
export default GoogleSignup;
