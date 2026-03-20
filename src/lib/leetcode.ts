// Replace with your actual usernames
const LEETCODE_USERNAME = process.env.NEXT_PUBLIC_LEETCODE_USERNAME || 'Vaibhav_pandey17';
const CODEFORCES_USERNAME = process.env.NEXT_PUBLIC_CODEFORCES_USERNAME || 'Alphacoder07_';
const CODECHEF_USERNAME = process.env.NEXT_PUBLIC_CODECHEF_USERNAME || 'alphacoder07';
const HACKERRANK_USERNAME = process.env.NEXT_PUBLIC_HACKERRANK_USERNAME || 'alphacoder07';

export async function getLeetCodeStats() {
    try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
        return null;
    }
}

export async function getLeetCodeBadges() {
    try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/badges`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching LeetCode badges:", error);
        return null;
    }
}

export async function getCodeforcesBadges() {
    try {
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${CODEFORCES_USERNAME}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        
        const data = await res.json();
        if (!data.result || !data.result[0]) return null;

        const user = data.result[0];
        const badges = [];

        // Codeforces rank badge
        if (user.rank) {
            badges.push({
                platform: 'Codeforces',
                displayName: `${user.rank.charAt(0).toUpperCase() + user.rank.slice(1)} (${user.rating})`,
                icon: 'https://codeforces.org/favicon.ico',
                creationDate: new Date(user.registrationTimeSeconds * 1000).toISOString().split('T')[0]
            });
        }

        // Max rating badge
        if (user.maxRating) {
            badges.push({
                platform: 'Codeforces',
                displayName: `Max Rating: ${user.maxRating}`,
                icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png',
                creationDate: 'Peak Achievement'
            });
        }

        return { badges };
    } catch (error) {
        console.error("Error fetching Codeforces badges:", error);
        return null;
    }
}

export async function getCodeChefBadges() {
    try {
        const res = await fetch(`https://codechef-api.vercel.app/${CODECHEF_USERNAME}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;

        const data = await res.json();
        const badges = [];

        if (data.stars) {
            badges.push({
                platform: 'CodeChef',
                displayName: `${data.stars}★ Verified Coder`,
                icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png',
                creationDate: 'Platform Ranking'
            });
        }

        if (data.globalRank) {
            badges.push({
                platform: 'CodeChef',
                displayName: `Global Rank: ${data.globalRank}`,
                icon: 'https://www.codechef.com/favicon.ico',
                creationDate: 'Current Standing'
            });
        }

        if (data.countryRank) {
            badges.push({
                platform: 'CodeChef',
                displayName: `Country Rank: ${data.countryRank}`,
                icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Medal/3D/medal_3d.png',
                creationDate: 'Regional Achievement'
            });
        }

        return { badges };
    } catch (error) {
        console.error("Error fetching CodeChef badges:", error);
        return null;
    }
}

export async function getHackerRankBadges() {
    try {
        // HackerRank doesn't have a public API, so we'll create mock badges based on common achievements
        const badges = [
            {
                platform: 'HackerRank',
                displayName: '5★ Problem Solving',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png',
                creationDate: 'Skill Certificate'
            },
            {
                platform: 'HackerRank',
                displayName: 'Python Certification',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
                creationDate: 'Verified'
            }
        ];
        return { badges };
    } catch (error) {
        console.error("Error fetching HackerRank badges:", error);
        return null;
    }
}

export async function getAllPlatformBadges() {
    const allBadges = [];

    const [lcBadges, cfBadges, ccBadges, hrBadges] = await Promise.all([
        getLeetCodeBadges(),
        getCodeforcesBadges(),
        getCodeChefBadges(),
        getHackerRankBadges()
    ]);

    if (lcBadges?.badges) allBadges.push(...lcBadges.badges);
    if (cfBadges?.badges) allBadges.push(...cfBadges.badges);
    if (ccBadges?.badges) allBadges.push(...ccBadges.badges);
    if (hrBadges?.badges) allBadges.push(...hrBadges.badges);

    return allBadges;
}
