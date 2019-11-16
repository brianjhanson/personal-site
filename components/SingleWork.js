import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

type Props = {
  title: String
}

const SingleWork = (props) => {
  // eslint-disable-next-line
  console.log('props', props);
  return (
    <h1>
      WRONG
    </h1>
  );
};

SingleWork.getInitialProps = (context) => {
  // eslint-disable-next-line
  console.log('context', context);
  return {
    title: 'hello'
  };
};

export default SingleWork;
