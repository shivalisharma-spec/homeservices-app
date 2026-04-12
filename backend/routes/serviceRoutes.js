app.get("/api/services", (req, res) => {
    const services = [
      {
        id: 1,
        name: "Plumbing Service",
        description: "Fix pipes and leaks",
        category: "plumbing",
      },
      {
        id: 2,
        name: "Electrical Service",
        description: "Wiring and repairs",
        category: "electrical",
      },
      {
        id: 3,
        name: "House Cleaning",
        description: "Full home cleaning",
        category: "cleaning",
      },
    ];
  
    res.json(services);
  });