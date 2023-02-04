import { request, gql } from 'graphql-request';
import { useRouter } from 'next/router';
import { Country, Language } from '.';

export type CountryPageProps = {
  country: Country
}

const CountryPage = ({ country }: CountryPageProps) => {
  const { back } = useRouter();
  return (
    <main className="text-3xl h-screen rounded-md rows-2">
      <button className="text-white bg-blue-700 hover:bg-blue-800 rotate-180 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => back()}>
        <svg aria-hidden="true" className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
      </button >
      <div className='flex text-center items-center justify-center'>
        <a className="block w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h1 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{country.emoji}</h1>
          <h1 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{country.name}</h1>
          <p className="m-5 font-normal text-gray-700 dark:text-gray-400">Code: {country.code}</p>
          <ul className='font-normal text-gray-700 dark:text-gray-400'> Languages:
            {country.languages.map((language: Language, index: number) => {
              return (
                <p key={index}>{language.name}</p>
              );
            })
            }
          </ul>
        </a>
      </div>
    </main >
  );
};

export const getStaticPaths = async () => {
  const query: string = gql`{
        countries {
          code
          name
          emoji
          languages {
            code
            name
          }
        }
      }`;

  const data = await request('https://countries.trevorblades.com', query);

  const { countries } = data;

  const paths = countries.map((country: any) => ({
    params: { code: country.code },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const { code } = context.params;
  const query: string = gql`{
        country(code: "${code}") {
          code
          name
          emoji
          languages {
            code
            name
          }
        }
      }`;

  const data = await request('https://countries.trevorblades.com', query);
  const { country } = data;

  return {
    props: {
      country
    }
  };
};

export default CountryPage;