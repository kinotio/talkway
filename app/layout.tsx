import '@styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { config } from '@fortawesome/fontawesome-svg-core'

import type { Metadata } from 'next'

import DefaultLayout from '@/layouts/DefaultLayout'

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'Talkway',
  description: 'Your ultimate destination for seamless conversations and meaningful connections.'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <DefaultLayout>{children}</DefaultLayout>
}

export default RootLayout
