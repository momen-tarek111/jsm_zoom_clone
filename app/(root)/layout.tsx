
import StreamClientProvider from '@/providers/StreamClientProvider';
import React from 'react'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "YOOM",
  description: "Video calling app",
  icons:{
    icon:"/icons/logo.svg"
  }
};
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