import './globals.css'
import MainNav from '../components/MainNav'
import { Lato } from 'next/font/google';

const lato = Lato({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='vh-100 background'>
                <MainNav />
                <main className={`main-content ${lato.className}`}>
                    {children}
                </main>
            </body>
        </html>
    );
}
