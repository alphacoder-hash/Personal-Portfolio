import React from 'react';
import { getLinkedInProfile } from '@/lib/linkedin';
import { LinkedInCard } from '@/components/LinkedInCard';
import { FadeIn } from '@/components/FadeIn';

export default async function LinkedInSection() {
    const profile = await getLinkedInProfile('https://www.linkedin.com/in/vaibhav-pandey-4532b8290/');

    if (!profile) return null;

    return (
        <section id="linkedin" className="py-20 relative z-10 w-full overflow-hidden">
            <div className="container mx-auto px-6 relative z-20">
                <FadeIn className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Professional <span className="text-blue-500">Network</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full" />
                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                        Connecting with industry leaders and staying updated with the latest trends in software engineering and technology.
                    </p>
                </FadeIn>

                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0.2}>
                        <LinkedInCard profile={profile} />
                    </FadeIn>
                </div>
            </div>

            {/* Background elements to match overall theme */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />
        </section>
    );
}
