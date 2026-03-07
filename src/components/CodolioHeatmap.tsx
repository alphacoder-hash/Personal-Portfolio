"use client";

import React, { useMemo } from 'react';
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar';
import { format, fromUnixTime, subYears } from 'date-fns';

interface CodolioHeatmapProps {
    heatmapData: Record<string, number>;
}

const theme: ThemeInput = {
    light: ['#1e293b', '#0369a1', '#0284c7', '#38bdf8', '#7dd3fc'],
    dark: ['#1e293b', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'],
};

export default function CodolioHeatmap({ heatmapData }: CodolioHeatmapProps) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const data = useMemo(() => {
        const calendarData: { date: string; count: number; level: number }[] = [];
        const timestamps = Object.keys(heatmapData).map(Number).sort((a, b) => a - b);

        if (timestamps.length === 0) return [];

        const dateMap = new Map<string, number>();
        timestamps.forEach((ts) => {
            const date = format(fromUnixTime(ts), 'yyyy-MM-dd');
            dateMap.set(date, heatmapData[ts.toString()]);
        });

        const today = new Date();
        // Show only last 6 months on mobile for better fit
        const startDate = isMobile ? subYears(today, 0.5) : subYears(today, 1);

        let currentDate = startDate;
        while (currentDate <= today) {
            const dateStr = format(currentDate, 'yyyy-MM-dd');
            const count = dateMap.get(dateStr) || 0;

            let level = 0;
            if (count > 0 && count <= 2) level = 1;
            else if (count > 2 && count <= 5) level = 2;
            else if (count > 5 && count <= 10) level = 3;
            else if (count > 10) level = 4;

            calendarData.push({
                date: dateStr,
                count,
                level,
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return calendarData;
    }, [heatmapData, isMobile]);

    if (!data || data.length === 0) return <div className="text-slate-500">No activity data found.</div>;

    return (
        <div className="w-full flex justify-center py-4">
            <div className="w-full max-w-full overflow-hidden flex justify-center">
                <ActivityCalendar
                    data={data}
                    theme={theme}
                    colorScheme="dark"
                    labels={{
                        legend: {
                            less: 'Less',
                            more: 'More',
                        },
                        months: [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        ],
                        totalCount: '{{count}} items in selected period',
                    }}
                    blockSize={isMobile ? 10 : 14}
                    blockMargin={isMobile ? 3 : 4}
                    fontSize={isMobile ? 12 : 14}
                />
            </div>
        </div>
    );
}
