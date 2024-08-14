import axios from "axios";

export const createLinkedInPost = async (req, res) => {
  const { accessToken, title, imageUrls, description } = req.body;

  try {
    const response = await axios.post(
      "https://api.linkedin.com/v2/ugcPosts",
      {
        author: `urn:li:person:${req.user.profile.id}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: description },
            shareMediaCategory: "IMAGE",
            media: imageUrls.map((url) => ({
              status: "READY",
              originalUrl: url,
              title: { text: title },
            })),
          },
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    res
      .status(201)
      .json({ message: "Post created successfully", data: response.data });
  } catch (error) {
    console.error("Error creating LinkedIn post:", error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.response.data });
  }
};

export const getLinkedinUserInfo = async (req, res) => {
  try {
    const {} = req.body;
  } catch (error) {
    console.error("Error getting user linkedin info:", error);
    res
      .status(500)
      .json({
        message: "Error getting user linkedin info ",
        error: error.response.data,
      });
  }
};
