import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import Link from 'next/link'

const name = 'The Movie DB'
export const siteTitle = 'The Movie DB'

export default function Layout({ 
  children, 
  home }: {
    children: React.ReactNode,
    home?: boolean
  }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Website built using the movie database API"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/tmdb.svg"
              height={144}
              width={144}
              alt={name}
            />
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/tmdb.svg"
                height={108}
                width={108}
                alt={name}
              />
            </Link>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  )
}
