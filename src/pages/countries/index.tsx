import { gql, request } from 'graphql-request';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['ID'];
  name: Scalars['String'];
  languages: Array<Language>;
  emoji: Scalars['String'];
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  native?: Maybe<Scalars['String']>;
  rtl: Scalars['Boolean'];
};

type CountriesPageProps = {
    countries: Country[];
}

const CountriesPage = ({ countries }: CountriesPageProps) => {
    const { back } = useRouter();
    const countriesList = countries.map((country: Country, index: number) => {
        return (
            <Link key={index} href={`/countries/${country.code}`}>
                <ul className="text-3xl text-center hover:font-bold flex items-center justify-center h-40
                   p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    {country.name}, {country.code}
                </ul>
            </Link>
        );
    });

    return (
        <main className="aspect-auto w-screen h-screen text-2xl">
            <button className="text-white bg-blue-700 hover:bg-blue-800 rotate-180 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => back()}>
                <svg aria-hidden="true" className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
            </button >
            <ul className="grid grid-cols-4">
                {countriesList}
            </ul>
        </main>
    );
};

export const getStaticProps: GetStaticProps<{ countries: Country[] }> = async (
    context
) => {
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

    return {
        props: {
            countries
        }
    };
};

export default CountriesPage;