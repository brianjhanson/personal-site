// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';

type Props = {
  data: Object,
}

function PostList({
  data: { loading, error, entries }
}: Props) {
  if (error) return (
    <div>
      Error Loading Posts
    </div>
  );


  if (entries && entries.length) {
    return (
      <ul>
        {entries.map((entry, idx) => (
          <li key={entry.id}>
            <Link href={`/work/single?slug=${entry.slug}`}>
              <a>
                {entry.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      Loading ...
    </div>
  );
}

export const workEntries = gql`
  query workEntries {
    entries(section:work) {
      id
      title
      slug
    }
  }
`;


export default graphql(workEntries, {
  options: {},
  props: ({ data }) => {
    return ({
      data
    });
  }
})(PostList);
