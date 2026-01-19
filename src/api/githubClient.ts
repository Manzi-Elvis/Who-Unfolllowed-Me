import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";

export class GitHubClient {
  private headers: Record<string, string>;

  constructor(token?: string) {
      this.headers = {
            "User-Agent": "gh-social-audit"
      };

      if (token) {
            this.headers["Authorization"] = `token ${token}`;
      }
  }


  private async getAllPaginated(endpoint: string): Promise<string[]> {
    const results: string[] = [];
    let page = 1;

    while (true) {
      const response = await axios.get(
        `${GITHUB_API_BASE}${endpoint}`,
        {
          headers: this.headers,
          params: { per_page: 100, page }
        }
      );

      if (response.data.length === 0) break;

      for (const user of response.data) {
        results.push(user.login);
      }

      page++;
    }

    return results;
  }

  getFollowers(username: string): Promise<string[]> {
    return this.getAllPaginated(`/users/${username}/followers`);
  }

  getFollowing(username: string): Promise<string[]> {
    return this.getAllPaginated(`/users/${username}/following`);
  }
}