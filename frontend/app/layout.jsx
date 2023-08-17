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
        <html className='h-100' lang="en">
            <body className='container background d-flex flex-column justify-content-center'>
                <MainNav />
                <main className={`${lato.className}`}>
                    {children}
                </main>
            </body>
        </html>
    );
}
