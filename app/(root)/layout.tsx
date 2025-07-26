
import StreamClientProvider from '@/providers/StreamClientProvider';
import React from 'react'

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <main>
            <StreamClientProvider>
                {children}
            </StreamClientProvider>
        </main>
    )
}

export default RootLayout