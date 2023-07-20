import Head from 'next/head'
import Image from 'next/image'
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
    <div className="">
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta
          name="description"
          content="Website built using the movie database API"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className="flex justify-left bg-[#032541]">
        {home ? (
          <>
            <Image
              priority
              src="/images/blue_long.svg"
              height={144}
              width={400}
              alt={name}
              className='m-4'
            />
            <ul className='flex text-lg font-bold ml-8 text-white justify-center items-center gap-4'>
              <li key={'1'} className='cursor-pointer hover:underline hover:text-xl target:underline'><Link href={'/upcoming'}>Upcoming</Link></li>
              <li key={'2'} className='cursor-pointer hover:underline hover:text-xl'><Link href={'/popular'}>Popular</Link></li>
              <li key={'3'} className='cursor-pointer hover:underline hover:text-xl'><Link href={'/top-rated'}>Top Rated</Link></li>
            </ul>
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
                className='m-4'
              />
            </Link>
          </>
        )}
      </header>
      {!home && (
        <div className="ml-4">
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <main>{children}</main>
    </div>
  )
}
