import dynamic from 'next/dynamic';

const LandingPageContent = dynamic(() => import('./components/landing/LandingPageContent'), {
	ssr: false,
});

export default function LandingPage() {
	return <LandingPageContent />;
}
