export const getSpotifyToken = async (clientid, clientsecret) => {
	console.log(clientid);
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
	console.log(token);
	// console.log(token.access_token);

	return await token;
};

export const spotifyGet = async (token, artist) => {
	console.log(token);
	const res = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
		method: "GET",
		headers: {
			// prettier-ignore
			"Authorization" : "Bearer " + token,
		},
	});

	const data = await res.json();
	console.log("The ID for the queried artist: " + data.artists.items[0].id);
	return data;
	// Getting the id for the queried artist
};
