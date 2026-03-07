import * as cheerio from 'cheerio';

export interface LinkedInPost {
    id: string;
    title: string;
    summary: string;
    date: string;
    url: string;
    type: 'Article' | 'Project' | 'Insight';
    image?: string;
}

export interface LinkedInProfile {
    name: string;
    headline: string;
    image: string;
    url: string;
    featuredPosts?: LinkedInPost[];
}

export async function getLinkedInPostMetadata(url: string): Promise<LinkedInPost | null> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
            cache: 'no-store',
        });

        if (!response.ok) return null;

        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $('meta[property="og:title"]').attr('content')?.split(' | ')[0] ||
            $('title').text().split(' | ')[0] ||
            'LinkedIn Post';

        const summary = $('meta[property="og:description"]').attr('content') ||
            $('meta[name="description"]').attr('content') ||
            'View this post on LinkedIn';

        const image = $('meta[property="og:image"]').attr('content') || '';

        return {
            id: Math.random().toString(36).substring(2, 11),
            title,
            summary,
            date: 'Recent',
            url,
            type: 'Insight',
            image
        };
    } catch (error) {
        console.error("Error fetching LinkedIn post metadata:", error);
        return null;
    }
}

export async function getLinkedInProfile(url: string): Promise<LinkedInProfile | null> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`Failed to fetch LinkedIn profile: ${response.statusText}`);
            return null;
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const name = $('meta[property="og:title"]').attr('content')?.split(' | ')[0] ||
            $('meta[name="title"]').attr('content')?.split(' | ')[0] ||
            'Vaibhav Pandey';

        const headline = $('meta[property="og:description"]').attr('content') ||
            $('meta[name="description"]').attr('content') ||
            'Software Engineer | Competitive Programmer';

        const image = $('meta[property="og:image"]').attr('content') ||
            $('meta[name="twitter:image"]').attr('content') ||
            $('.top-card-layout__image').attr('src') ||
            $('.profile-photo-edit__preview').attr('src') ||
            '';

        // Try to find featured items in the public profile HTML
        const featuredItems = $('.top-card-layout__featured-list-item, .featured-item, [data-test-id="featured-section"] .artdeco-carousel__item');

        const featuredPosts: LinkedInPost[] = [];

        featuredItems.each((i, el) => {
            if (i >= 3) return; // Limit to 3 items
            const item = $(el);
            const title = item.find('.featured-item__title, .artdeco-carousel__item-title').text().trim();
            const summary = item.find('.featured-item__description, .artdeco-carousel__item-description').text().trim();
            const postUrl = item.find('a').attr('href') || '';
            const imageUrl = item.find('img').attr('src') || '';

            if (title) {
                featuredPosts.push({
                    id: `real-post-${i}`,
                    title,
                    summary: summary || 'View this featured item on LinkedIn',
                    date: 'Featured',
                    url: postUrl.startsWith('http') ? postUrl : `https://www.linkedin.com${postUrl}`,
                    type: 'Insight',
                    image: imageUrl
                });
            }
        });

        // Specific post URLs to fetch real data from
        const postUrls: string[] = [
            'https://www.linkedin.com/posts/vaibhav-pandey-4532b8290_awscommunityday-vadodara2025-agenticai-activity-7374485810613571584-sqNQ'
        ];

        for (const postUrl of postUrls) {
            try {
                const post = await getLinkedInPostMetadata(postUrl);
                if (post) featuredPosts.push(post);
            } catch (e) {
                console.error(`Failed to fetch metadata for ${postUrl}`);
            }
        }

        // Use real items found by research
        const defaultPosts: LinkedInPost[] = [
            {
                id: 'real-post-1',
                title: '🚀 Exciting times at the 36 Hours PU Code Hackathon 2.0',
                summary: 'Participated in a grueling 36-hour hackathon! Key highlights: Collaboration, Time Management, Continuous Learning, and the power of Networking in tech.',
                date: 'Jan 2025',
                url: 'https://www.linkedin.com/posts/vaibhav-pandey-4532b8290_hackathon-innovation-teamwork-activity-7281300402208190464-4aEY',
                type: 'Insight',
                image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop'
            },
            {
                id: 'real-post-2',
                title: '🔓 Level Unlocked: From National Hackathon to Synchrony!',
                summary: 'Grinding through CTF challenges and national-level hackathons has paved the way for my next chapter at Synchrony. A journey of persistent learning.',
                date: 'Jan 2025',
                url: 'https://www.linkedin.com/in/vaibhav-pandey-4532b8290/recent-activity/all/',
                type: 'Article',
                image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop'
            },
            {
                id: 'real-post-3',
                title: 'Optimizing Java for Competitive Programming',
                summary: 'Sharing insights on why Java remains my go-to for complex algorithmic challenges on platforms like LeetCode and CodeChef.',
                date: 'Recents',
                url: 'https://www.linkedin.com/in/vaibhav-pandey-4532b8290/recent-activity/all/',
                type: 'Insight',
                image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop'
            }
        ];

        return {
            name,
            headline,
            image: image.startsWith('http') ? image : '',
            url,
            featuredPosts: featuredPosts.length > 0 ? featuredPosts : defaultPosts
        };
    } catch (error) {
        console.error("Error fetching LinkedIn metadata:", error);
        // Fallback for when LinkedIn blocks scraping (very common)
        return {
            name: "Vaibhav Pandey",
            headline: "Pre-Final Year CSE Student | Competitive Programmer (Java) | Web Developer (MERN Stack)",
            image: "/avatar.png",
            url: "https://www.linkedin.com/in/vaibhav-pandey-4532b8290/",
            featuredPosts: [
                {
                    id: 'post-1',
                    title: 'Optimizing Java for Competitive Programming',
                    summary: 'Java gets a bad rep for being "slow," but with Fast I/O and efficient memory management, it\'s a powerhouse for solving complex algorithmic challenges.',
                    date: 'March 2026',
                    url: 'https://www.linkedin.com/in/vaibhav-pandey-4532b8290/recent-activity/all/',
                    type: 'Insight',
                    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop'
                },
                {
                    id: 'post-2',
                    title: 'Building Scalable Architectures with MERN',
                    summary: 'How I structure my Node.js backends for maximum scalability and performance.',
                    date: 'Feb 2026',
                    url: 'https://www.linkedin.com/in/vaibhav-pandey-4532b8290/recent-activity/all/',
                    type: 'Project',
                    image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop'
                }
            ]
        };
    }
}
