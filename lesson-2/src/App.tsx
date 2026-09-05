import { useState, useEffect } from "react";

export function App() {
  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [tracks, setTracks] = useState([])  

  useEffect(() => {
    console.log("effect")
    fetch("https://musicfun.it-incubator.app/api/1.0/playlists/tracks", {
      headers: {
        "api-key": "e7f849b1-fdc2-4e98-bc82-51851254ad1f",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setTracks(json.data)
      })
  }, [])

  if (tracks === null) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <span>Loading...</span>
      </div>
    )
  }
 
  if (tracks.length === 0) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <span>No tracks</span>
      </div>
    )
}
 
  return (
    <div>
      <h1>Musicfun</h1>
      <button onClick={() => setSelectedTrackId(null)}>Reset selection</button>
      <ul>
        {tracks.map((track) => (
          <li key={track.id} style={{border: track.id === selectedTrackId ? '1px solid orange' : 'none'}}>
            <div onClick={() => {
              setSelectedTrackId(track.id) // передаём реакту актуальный id
            }}>{track.attributes.title}</div>
            <audio src={track.attributes.attachments[0].url} controls={true}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
