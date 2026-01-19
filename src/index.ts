import { GitHubClient } from "./api/githubClient";
import { RelationshipAnalyzer } from "./services/relationshipAnalyzer";

async function main() {
  console.log("\n🔍 GitHub Social Audit Tool\n");

  const username = process.argv[2];

  if (!username) {
    console.error("❌ Please provide a GitHub username");
    console.log("Usage: npm start <username>");
    process.exit(1);
  }

  const token = process.env.GITHUB_TOKEN;
  const client = new GitHubClient(token);
  const analyzer = new RelationshipAnalyzer(client);

  console.log("Analyzing relationships...\n");

  const notFollowingBack = await analyzer.notFollowingBack(username);

  if (notFollowingBack.length === 0) {
    console.log(" Everyone you follow follows you back!");
    return;
  }

  console.log("❌ Users you follow who DON'T follow you back:\n");
  for (const user of notFollowingBack) {
    console.log(`- ${user}`);
  }
  console.log("Token loaded:", !!process.env.GITHUB_TOKEN);
}

main().catch(err => {
  console.error("🔥 Error:", err.message);
});