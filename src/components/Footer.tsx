import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center py-8 border-t border-white/10 text-slate-500 text-sm mt-32 relative z-10 w-full glass">
            <p>© {new Date().getFullYear()} Vaibhav Pandey. Engineered with Next.js, Framer Motion & R3F.</p>
        </footer>
    );
};

export default Footer;
