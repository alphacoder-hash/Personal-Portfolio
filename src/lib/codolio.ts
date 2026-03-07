export interface CodolioStats {
    platformStats: {
        platform: string;
        totalQuestions: number;
        rating?: number | string | null;
    }[];
    totalQuestionsSolved: number;
    totalActiveDays: number;
    maxStreak: number;
    heatmapData: Record<string, number>;
    badges: { platform: string; displayName: string; icon: string; creationDate?: string }[];
}

export async function getCodolioStats(username: string): Promise<CodolioStats | null> {
    try {
        const response = await fetch(`https://api.codolio.com/profile?userKey=${username}`, {
            cache: 'no-store', // Real-time fetching
        });

        if (!response.ok) {
            console.error("Failed to fetch Codolio stats");
            return null;
        }

        const json = await response.json();

        if (!json.success && !json.status?.success) {
            if (!json.data) return null;
        }

        const profiles = json.data?.platformProfiles?.platformProfiles || [];

        let totalQuestionsSolved = 0;
        let totalActiveDays = 0;
        let maxStreak = 0;
        const platformStats: CodolioStats["platformStats"] = [];
        const heatmapData: Record<string, number> = {};
        const badges: CodolioStats["badges"] = [];

        profiles.forEach((profile: any) => {
            const platform = profile.platform || "Unknown";
            const totalQuestions = profile.totalQuestionStats?.totalQuestionCounts || 0;
            const rating = profile.userStats?.currentRating || null;

            if (totalQuestions > 0) {
                totalQuestionsSolved += totalQuestions;
                platformStats.push({ platform, totalQuestions, rating });
            }

            // Extract Codolio Badges (if available)
            if (profile.userStats?.badgeList && Array.isArray(profile.userStats.badgeList)) {
                profile.userStats.badgeList.forEach((b: any) => {
                    badges.push({
                        platform,
                        displayName: b.name || b.title || b.displayName || "Achievement",
                        icon: b.icon || b.imgUrl || b.url || "",
                        creationDate: b.date || b.creationDate
                    });
                });
            }

            // Synthesize Awards from Platform Levels & Stars
            if (platform.toLowerCase() === 'codeforces' && profile.userStats?.userLevelName) {
                badges.push({
                    platform: "Codeforces",
                    displayName: `${profile.userStats.userLevelName} Rank`,
                    icon: "https://cdn3d.iconscout.com/3d/premium/thumb/medal-4493393-3739818.png",
                    creationDate: `Highest Rating: ${profile.userStats.maxRating || profile.userStats.currentRating}`
                });
            }

            if (platform.toLowerCase() === 'codechef') {
                if (profile.userStats?.stars) {
                    badges.push({
                        platform: "CodeChef",
                        displayName: `${profile.userStats.stars}★ Verified Coder`,
                        // Using a highly reliable 3D trophy icon
                        icon: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png",
                        creationDate: "Platform Ranking"
                    });
                }

                if (totalQuestions >= 250) {
                    badges.push({
                        platform: "CodeChef",
                        displayName: "250+ Problems Solved",
                        icon: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png",
                        creationDate: "Solver Badge"
                    });
                }
            }

            if (platform.toLowerCase() === 'hackerrank') {
                badges.push({
                    platform: "HackerRank",
                    displayName: "5★ Problem Solving",
                    icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
                    creationDate: "Skill Certificate"
                });
            }

            // Extract Max Streak from individual platforms
            const platformStreak = profile.dailyActivityStatsResponse?.maxStreak || 0;
            if (platformStreak > maxStreak) maxStreak = platformStreak;

            // Merge heatmap
            const calendar = profile.dailyActivityStatsResponse?.submissionCalendar;
            if (calendar && typeof calendar === 'object') {
                Object.keys(calendar).forEach((timestamp) => {
                    const count = calendar[timestamp];
                    if (heatmapData[timestamp]) {
                        heatmapData[timestamp] += count;
                    } else {
                        heatmapData[timestamp] = count;
                    }
                });
            }
        });

        return {
            platformStats,
            totalQuestionsSolved,
            totalActiveDays: Object.keys(heatmapData).length, // Unique active days across all platforms
            maxStreak,
            heatmapData,
            badges
        };

    } catch (error) {
        console.error("Error fetching Codolio data:", error);
        return null;
    }
}
