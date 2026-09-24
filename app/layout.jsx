import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata = {
  title: 'Praveen | Full Stack Developer & AI Systems | NIE Mysuru',
  description: 'Modern animated developer portfolio of Praveen, 2nd-year CSE undergraduate at The National Institute of Engineering (NIE), Mysuru. Specializing in Python backend architectures, FastAPI, Qdrant RAG vector retrieval, and Next.js full-stack applications.',
  keywords: ['Praveen', 'NIE Mysuru', 'National Institute of Engineering', 'FastAPI', 'Qdrant', 'RAG', 'Vector Search', 'Python Backend', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  authors: [{ name: 'Praveen', url: 'https://github.com/sp5900638-max' }],
  creator: 'Praveen',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2300f5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6Z"/></svg>',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preload" href="/hacker-intro.jpg" as="image" />
      </head>
      <body className="bg-light-bg dark:bg-[#07090e] text-slate-900 dark:text-slate-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-accent">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
