import dynamic from 'next/dynamic';
import { Header } from './components/landing/header/Header';

const LandingPageContent = dynamic(() => import('./components/landing/LandingPageContent'), {
	ssr: false,
});

export default function LandingPage() {
	return <LandingPageContent />;
}
