// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");

  // Get the contract factory
  const DocumentRegistry = await ethers.getContractFactory("DocumentRegistry");
  console.log("📋 Contract factory created");

  // Deploy the contract
  const documentRegistry = await DocumentRegistry.deploy();
  console.log("⏳ Deploying DocumentRegistry...");

  // Wait for deployment to finish
  await documentRegistry.waitForDeployment();
  const address = await documentRegistry.getAddress();
  
  console.log("✅ DocumentRegistry deployed to:", address);
  console.log("📝 Contract address for .env file:", address);
  
  // Get deployer address
  const [deployer] = await ethers.getSigners();
  console.log("👤 Deployer address:", await deployer.getAddress());
  
  // Grant roles to deployer
  const ADMIN_ROLE = await documentRegistry.ADMIN_ROLE();
  const HEALTHCARE_ROLE = await documentRegistry.HEALTHCARE_ROLE();
  const AGRICULTURE_ROLE = await documentRegistry.AGRICULTURE_ROLE();
  const FINANCE_ROLE = await documentRegistry.FINANCE_ROLE();
  
  console.log("🔐 Roles granted to deployer:");
  console.log("   - ADMIN_ROLE");
  console.log("   - HEALTHCARE_ROLE");
  console.log("   - AGRICULTURE_ROLE");
  console.log("   - FINANCE_ROLE");
  
  console.log("\n📋 Next steps:");
  console.log("1. Copy the contract address above to your .env file");
  console.log("2. Update CONTRACT_ADDRESS in backend/.env");
  console.log("3. Make sure your PRIVATE_KEY in .env matches the deployer");
  console.log("4. Start your backend server with: npm start");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
