import cookie from "cookie";
const handler = (req, res) => {
  if (req.method !== "GET") {
    res.json({
      success: false,
      message: "Only GET is allowed",
    });
  }
  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        maxAge: 0,
        path: "/",
      })
    )
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
};

export default handler;
