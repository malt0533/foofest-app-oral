//TODO SPOTIFY - SPOTIFY IFRAME
import { useEffect, useState, useRef } from "react";

function SpotifyIframe({ artist }) {
	const [spotifyURL, setSpotifyURL] = useState("");
	const [firstMount, setFirstMount] = useState(true);

	useEffect(() => {
		const artistExists = () => {
			if (artist !== undefined) {
				setSpotifyURL(`https://open.spotify.com/embed/artist/${artist.id}?utm_source=generator`);
			} else {
				setSpotifyURL(
					"https://open.spotify.com/embed/playlist/5nqguiHEZDhFDs0szDS8eu?utm_source=generator"
				);
			}
		};

		if (!firstMount) {
			artistExists();
		} else {
			setFirstMount(false);
		}
	}, [firstMount, artist]);

	return (
		<iframe
			title="Spotify Embed"
			name="spotify"
			id="spotify"
			src={spotifyURL}
			width="100%"
			height="80"
			frameBorder="0"
			allowFullScreen=""
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
		></iframe>
	);
}

export default SpotifyIframe;
