import Head from 'next/head'
import Button from 'components/button';
import SideBar from 'components/sidebar';
import Selector from 'components/selector';
import { useCategories } from 'contexts/prefs';
import Link from 'next/link';

export default function Home() {
  const categories = useCategories();

  return (
    <>
      <Head>
        <title>Foforum - a forum for everyone</title>
      </Head>

      <div>
        <h1>Categories</h1>
        <ul>
          {
            categories.map((i) =>
              <li key={i.id}>
                <Link style={{ display: 'block' }} href={`/c/${i.id}`}>{ i.label }</Link>
              </li>
            )
          }
        </ul>
      </div>
    </>
  )
}
