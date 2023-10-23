const cookie = require("cookie");

const handleLogout = async (req, res) => {
    res.set(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          expires: new Date(0),
          path: "/",
        })
      );
    
      return res.status(200).json({ success: true });
    
}

module.exports = { handleLogout }