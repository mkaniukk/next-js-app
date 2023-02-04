import { useQuery, gql } from '@apollo/client';
import styles from '../styles/Home.module.css';
import { Country, Language } from '@/pages/countries';
import Link from 'next/link';

const QUERY = gql`
  query Countries {
    country(code: "PL") {
        code
        name
        emoji
        languages {
          code
          name
        }
      }
  }
`;

export default function Countries() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return (
      <main className="text-3xl h-screen rounded-md rows-2">
        <div className='flex text-center items-center justify-center'>
          <a className="block w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h1>Loading profile...</h1>
          </a>
        </div>
      </main>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  const country: Country = data.country;

  return (
    <main className="text-3xl h-screen rounded-md rows-2">
      <Link href={'/countries/PL'}>
        <div className='flex text-center items-center justify-center'>
          <a className="block w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <h1 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{country.name}, {country.code}</h1>
            <p className="m-5 font-normal text-gray-700 dark:text-gray-400">Code: {country.code}</p>
          </a>
        </div>
      </Link>
    </main>
  );
}