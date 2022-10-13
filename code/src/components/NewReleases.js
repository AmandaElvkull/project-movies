/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Orbit } from '@uiball/loaders';

export const NewReleases = () => {
  const [newReleases, setNewReleases] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=124871c87c46d6e667f133342d66de5c&language=en-US&page=1')
      .then((res) => res.json())
      .then((json) => setNewReleases(json.results))
      .catch((error) => alert(error, 'error'))
      .finally(() => setLoading(false));
  }, [])

  if (loading) {
    return (
      <>
        <h2>Loading..</h2>
        <Orbit size={40} speed={0.9} color='black' />
      </>
    );
  }
  return (
    <section className='new-releases'>
      <h1 className='on-cinema'>On cinema right now</h1>
      <div className='movies-container'>
        {newReleases.map((releases) => (
          <article className='movie-wrapper' key={releases.id}>
            <Link key={releases.id} to={`/newReleases/${releases.id}`}>
              <img src={`https://image.tmdb.org/t/p/w342${releases.poster_path}`} alt={releases.title} />
              <div className='details'>
                <h1>{releases.original_title}</h1>
                <p>Release date {releases.release_date}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
