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
            <body>
                <MainNav />
                <div className={lato.className}>
                    {children}
                </div>
            </body>
        </html>
    );
}
