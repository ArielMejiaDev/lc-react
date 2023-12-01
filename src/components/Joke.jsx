import React from 'react';
import { useQuery } from 'react-query';

export default function Reddit() {
  const {
    data: joke,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery('joke', fetchJoke, {
    // staleTime: 6000,
    refetchOnWindowFocus: false,
  });

  function fetchJoke() {
    return fetch('https://official-joke-api.appspot.com/jokes/random').then(
      response => response.json()
    );
  }

  return (
    <div>
      <h2>Joke API</h2>
      {isLoading && <div>Loading...</div>}
      {isSuccess && <div>{joke.setup + ' ' + joke.punchline}</div>}
      {isError && <div>{error.message}</div>}
    </div>
  );
}
