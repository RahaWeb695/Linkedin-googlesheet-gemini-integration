import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config({ path: "./config/config.env" });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://linkedin-gemini-gs-server.onrender.com/api/v1/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Store user profile along with access and refresh tokens in your database
        const user = { profile, accessToken, refreshToken };
        // Store the user in your database or session
        return done(null, user);
      } catch (error) {
        console.error("Error during authentication:", error);
        return done(error);
      }
    }
  )
);

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL:
        "https://linkedin-gemini-gs-server.onrender.com/api/v1/auth/linkedin/callback",
      scope: ["r_liteprofile", "r_emailaddress", "w_member_social"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Store user profile along with access and refresh tokens in your database
        const user = { profile, accessToken, refreshToken };
        // Store the user in your database or session
        return done(null, user);
      } catch (error) {
        console.error("Error during LinkedIn authentication:", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Function to refresh the Google access token
export async function refreshAccessToken(refreshToken) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:5173/api/v1/auth/google/callback"
  );

  oauth2Client.setCredentials({ refresh_token: refreshToken });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials.access_token;
  } catch (error) {
    console.error("Error refreshing Google access token:", error);
    throw error;
  }
}

// Function to refresh the LinkedIn access token
export async function refreshLinkedInAccessToken(user) {
  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "refresh_token",
          refresh_token: user.refreshToken,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        },
      }
    );

    const newAccessToken = response.data.access_token;
    user.accessToken = newAccessToken;

    // Update user in the database
    // ...

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing LinkedIn access token:", error);
    throw error;
  }
}
