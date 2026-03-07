export async function getLeetCodeStats() {
    try {
        const res = await fetch('https://leetcode-stats-api.herokuapp.com/Vaibhav_pandey17', {
            cache: 'no-store' // Fetch real-time data strictly
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
        const res = await fetch('https://alfa-leetcode-api.onrender.com/Vaibhav_pandey17/badges', {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching LeetCode badges:", error);
        return null;
    }
}
