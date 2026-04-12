app.post("/api/auth/signup", async (req, res) => {
    try {
      console.log("BODY RECEIVED:", req.body);
  
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({
          message: "All fields required",
        });
      }
  
      const existing = await User.findOne({ email });
  
      if (existing) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
  
      const user = await User.create({ name, email, password });
  
      res.json({
        user: {
          id: user._id,
          name,
          email,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  });