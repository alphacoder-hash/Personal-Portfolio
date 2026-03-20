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

export interface CodolioBadge {
    platform: string;
    displayName: string;
    icon: string;
    creationDate?: string;
}

export async function getCodolioStats(username: string): Promise<CodolioStats | null> {
    try {
        const response = await fetch(`https://api.codolio.com/profile?userKey=${username}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
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
        let badges: CodolioBadge[] = [];

        profiles.forEach((profile: any) => {
            const platform = profile.platform || "Unknown";
            const totalQuestions = profile.totalQuestionStats?.totalQuestionCounts || 0;
            const rating = profile.userStats?.currentRating || null;

            if (totalQuestions > 0) {
                totalQuestionsSolved += totalQuestions;
                platformStats.push({ platform, totalQuestions, rating });
            }

            // Extract badges from Codolio API
            if (profile.userStats?.badgeList && Array.isArray(profile.userStats.badgeList)) {
                profile.userStats.badgeList.forEach((b: any) => {
                    badges.push({
                        platform,
                        displayName: b.name || b.title || b.displayName || "Achievement",
                        icon: b.icon || b.imgUrl || b.url || "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png",
                        creationDate: b.date || b.creationDate || b.earnedDate
                    });
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

        // If no badges from API, add the manual badges from your screenshot
        if (badges.length === 0) {
            badges = [
                {
                    platform: "LeetCode",
                    displayName: "Received for solving 250 Problems",
                    icon: "🏅",
                    creationDate: "Achievement"
                },
                {
                    platform: "LeetCode",
                    displayName: "Received for participating in 25 Contests",
                    icon: "🏆",
                    creationDate: "Achievement"
                },
                {
                    platform: "LeetCode",
                    displayName: "Java",
                    icon: "☕",
                    creationDate: "Language Badge"
                },
                {
                    platform: "LeetCode",
                    displayName: "Problem Solving",
                    icon: "⭐",
                    creationDate: "5★ Rating"
                },
                {
                    platform: "LeetCode",
                    displayName: "Feb LeetCoding Challenge",
                    icon: "📅",
                    creationDate: "28 Feb 2026"
                },
                {
                    platform: "LeetCode",
                    displayName: "50 Days Badge 2026",
                    icon: "🔥",
                    creationDate: "23 Feb 2026"
                },
                {
                    platform: "LeetCode",
                    displayName: "Jan LeetCoding Challenge",
                    icon: "📅",
                    creationDate: "31 Jan 2026"
                },
                {
                    platform: "LeetCode",
                    displayName: "50 Days Badge 2025",
                    icon: "🔥",
                    creationDate: "27 Dec 2025"
                }
            ];
        }

        return {
            platformStats,
            totalQuestionsSolved,
            totalActiveDays: Object.keys(heatmapData).length,
            maxStreak,
            heatmapData,
            badges
        };

    } catch (error) {
        console.error("Error fetching Codolio data:", error);
        
        // Return fallback badges if API fails
        return {
            platformStats: [],
            totalQuestionsSolved: 0,
            totalActiveDays: 0,
            maxStreak: 0,
            heatmapData: {},
            badges: [
                {
                    platform: "LeetCode",
                    displayName: "Received for solving 250 Problems",
                    icon: "🏅",
                    creationDate: "Achievement"
                },
                {
                    platform: "LeetCode",
                    displayName: "Received for participating in 25 Contests",
                    icon: "🏆",
                    creationDate: "Achievement"
                },
                {
                    platform: "LeetCode",
                    displayName: "Java",
                    icon: "☕",
                    creationDate: "Language Badge"
                },
                {
                    platform: "LeetCode",
                    displayName: "Problem Solving",
                    icon: "⭐",
                    creationDate: "5★ Rating"
                },
                {
                    platform: "LeetCode",
                    displayName: "Feb LeetCoding Challenge",
                    icon: "📅",
                    creationDate: "28 Feb 2026"
                },
                {
                    platform: "LeetCode",
                    displayName: "50 Days Badge 2026",
                    icon: "🔥",
                    creationDate: "23 Feb 2026"
                },
                {
                    platform: "LeetCode",
                    displayName: "Jan LeetCoding Challenge",
                    icon: "📅",
                    creationDate: "31 Jan 2026"
                },
                {
                    platform: "LeetCode",
                    displayName: "50 Days Badge 2025",
                    icon: "🔥",
                    creationDate: "27 Dec 2025"
                }
            ]
        };
    }
}
