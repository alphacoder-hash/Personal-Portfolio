const GITHUB_USERNAME = "alphacoder-hash";

export async function getGithubProfile() {
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching GitHub profile:", error);
        return null;
    }
}

export async function getGithubRepos() {
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return [];
    }
}
