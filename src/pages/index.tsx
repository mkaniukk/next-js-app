import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <main className="text-3xl columns-2">
            <div>
                <Link href='/countries'>
                    <h1 className="text-3xl font-bold flex items-center justify-center
                    bg-sky-500/50 hover:bg-sky-500/25 h-screen">
                        Countries
                    </h1>
                </Link>
            </div>
            <div>
                <Link href='/profile'>
                    <h1 className="text-3xl font-bold flex items-center justify-center
                    bg-sky-500/50 hover:bg-sky-500/25 h-screen">
                        Profile
                    </h1>
                </Link>
            </div>
        </main>
    );
}
