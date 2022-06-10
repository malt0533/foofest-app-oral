//TODO SPOTIFY - SPOTIFY API
export const getSpotifyID = async (clientid, clientsecret, artist) => {
	const res = await fetch("https://accounts.spotify.com/api/token", {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			// prettier-ignore
			"Authorization": "Basic " + btoa(clientid + ":" + clientsecret),
		},
		body: "grant_type=client_credentials",
		method: "POST",
	});
	const token = await res.json();

	const resArtist = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
		method: "GET",
		headers: {
			// prettier-ignore
			"Authorization" : "Bearer " + token.access_token,
		},
	});

	const data = await resArtist.json();
	return data.artists.items[0];
};
