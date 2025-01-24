const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // Ensure this is correct for testing
  client_id:
    "AVUOnpUhSmnQ2M9NsfpV9OZBDSNopXPZ-Dh90xM8c9QO6vPfhW4mYWDX6Zq_X5LMOMs4rPL2YxJH9xBH",
  client_secret:
    "ENrfEn2mSFyBlTFwmhpTvZKULcLu1ShjQ1c72TVW-kpu9KIXgUEqmJxXHvDwrXDkw-5Tayppa0ZnKR6w",
}); 

module.exports = paypal;
