import { useQuery } from 'react-query';

export default function Reddit() {
  // const {
  //   data: posts,
  //   isLoading,
  //   errorMessage,
  // } = useFetch('https://www.reddit.com/r/aww.json');

  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery('posts', fetchPosts, {
    retry: false,
    // retryDelay: 3000,
  });

  function fetchPosts() {
    return fetch('https://www.reddit.com/r/aww.json').then(response =>
      response.json()
    );
  }

  return (
    <div>
      <h2>Reddit API</h2>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <ul>
          {posts.data.children.map(post => (
            <li key={post.data.id}>
              <a href={`https://reddit.com${post.data.permalink}`}>
                {post.data.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {isError && <div>{error.message}</div>}
    </div>
  );
}
