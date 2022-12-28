import React, { useState } from "react";
import ReactDOM from "react-dom";
// or
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pathname } from "../../Pathname";
import {
  
  signupWithGoogle,
} from "../../Views/afterAuth/PlatformLogin/Redux/reducer";

const Googledemo = () => {
  const [GoogleResponse, setGoogleResponse] = useState(true);
  const { googleSignupLoading, google_token } = useSelector(
    (state) => state.platform
  );
  const navigate = useNavigate();
  console.log("jai mata di", google_token);
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    console.log("responseGoogle",response);
    setGoogleResponse(response);
    dispatch(signupWithGoogle(response));
  };
  if (googleSignupLoading === "succeeded") {
    console.log("thik hai", google_token?.payload?.accessToken);

    if (GoogleResponse) {
      dispatch(GetCalendarData(google_token?.payload?.accessToken));
      setGoogleResponse(!GoogleResponse);
    }
  }
  if (!google_token == "") {
    console.log("has token");
    localStorage.setItem(
      "google_token",
      JSON.stringify(google_token?.payload?.accessToken)
    );
  } else {
    
  }
  return (
    <div>
      <GoogleLogin
        clientId="589378485445-b7htdtu42c8gqg2s3on5pkm0hkisgq2r.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        accessType="offline"
        prompt="consent"
        scope="https://www.googleapis.com/auth/calendar"
      />
    </div>
  );
};

export default Googledemo;
