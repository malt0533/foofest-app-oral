//TODO SPOTIFY - SPECIFIC ARTIST

import { useParams, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BandsContext } from "../../contexts/bandContext";
import Button from "../Buttons/Button";

import SpotifyIframe from "./SpotifyIframe";

import { getSpotifyID } from "./_spotifyAPI";

export default function SpecificArtist() {
	// Check for first mount
	const [firstMount, setFirstMount] = useState(true);
	const location = useLocation();
	const { logos } = location.state;

	const { bands } = useContext(BandsContext);
	const params = useParams();

	const band = bands.filter((band) => {
		return band.id === params.artistid;
	})[0];

	// Details for spotify
	const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
	// State for artist ID
	const [artist, setArtist] = useState("");

	useEffect(() => {
		const getToken = async () => {
			setArtist(await getSpotifyID(REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET, band.name));
		};

		if (!firstMount) {
			getToken();
		} else {
			setFirstMount(false);
		}
	}, [firstMount]);

	return (
		<div id="specific_artist">
			<div id="band_text" className="grid">
				<Button></Button>
				<div className="desciption">
					<h1>{band.name}</h1>
					<p>{band.bio}</p>

					<div className="band_info">
						<div>
							<h4>Band members:</h4>
							{band.members.map((m) => {
								return <p key={uuidv4()}>{m}</p>;
							})}
						</div>
						<div>
							<h4>Genre:</h4>
							<p>{band.genre}</p>
							<h4>Mood:</h4>
							<p>{band.mood}</p>
						</div>
					</div>
				</div>
			</div>
			<div id="player_container" className="grid">
				<figure>
					<figcaption>{band.logoCredits}</figcaption>
					<img src={logos.logos} alt="" />
				</figure>
				{/* Set iframe based on artist */}
				{artist ? <SpotifyIframe artist={artist} /> : <SpotifyIframe />}
			</div>
		</div>
	);
}
