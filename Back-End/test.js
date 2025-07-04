const bcrypt = require('bcryptjs');

(async () => {
    const plainPassword = "123";
    const hashed = await bcrypt.hash(plainPassword, 10);
    console.log("Hashed2:", hashed);
  
    const isMatch = await bcrypt.compare("123", hashed);
    console.log("Password match?", isMatch); // ✅ Should be true
  })();
