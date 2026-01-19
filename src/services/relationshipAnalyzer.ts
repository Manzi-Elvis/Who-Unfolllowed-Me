import { GitHubClient } from "../api/githubClient";

export class RelationshipAnalyzer {
  constructor(private githubClient: GitHubClient) {}

  async notFollowingBack(username: string): Promise<string[]> {
    const followers = new Set(await this.githubClient.getFollowers(username));
    const following = new Set(await this.githubClient.getFollowing(username));

    return [...following]
      .filter(user => !followers.has(user))
      .sort();
  }

  async mutualFollowers(username: string): Promise<string[]> {
    const followers = new Set(await this.githubClient.getFollowers(username));
    const following = new Set(await this.githubClient.getFollowing(username));

    return [...followers]
      .filter(user => following.has(user))
      .sort();
  }
}