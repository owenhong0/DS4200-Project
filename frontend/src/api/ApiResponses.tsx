import {Box, Button} from "@mui/material";
import React, {useState} from "react";
import {saveAs} from "file-saver";


type TrackData = {
    [key: string]: string
}

interface JoinData {
    release_date: string;
}

interface Artist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        url: string;
        height: number;
        width: number;
    }[];
    name: string;
    release_date: string;  // Release date as a string (e.g., "1981-12")
    release_date_precision: string;
    restrictions: {
        reason: string;
    };
    type: string;
    uri: string;
    artists: Artist[];
}

interface ExternalIds {
    isrc: string;
    ean: string;
    upc: string;
}

interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: object;
    restrictions: {
        reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}

// Define the structure of your API response
type SpotifyTrackResponse = Track;

interface ReleaseDate {
    track_id: string;   // Unique ID for each track
    release_date: string; // Release date as a string (could be in ISO format like 'YYYY-MM-DD')
}


export default function ApiResponses() {
    const [columnDataToSearch, setColumnData] = useState<TrackData[]>();
    const [columnDataToJoin, setColumnDataToJoin] = useState<ReleaseDate[]>();
    const getSpotifyAccessToken = async () => {
        const clientId = "7ddcff6c2baf45c8854857f577f2c03f";
        const clientSecret = "7be3bec474714a83b6ab29016ad6936c";

        const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error('Error fetching access token');
        }

        console.log("Access Token:", data.access_token); // Log to verify
        return data.access_token;
    };

    const fetchTrackData = async () => {
        try {
            const response = await fetch(`/songs_data.json`);
            if (!response.ok) {
                console.error('Track not found')
            }

            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    const fetchTrackAPIData = async (accessToken: string, trackId: string): Promise<SpotifyTrackResponse | undefined> => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/tracks/${trackId}?market=US`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            if (!response.ok) {
                console.error('Track not found');
                return undefined;
            }

            const data: SpotifyTrackResponse = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return undefined;
        }
    };

    const handleAPIClick = (acesssToken: string) => {
        const loadedData = columnDataToSearch !== null ? columnDataToSearch : [];
        const resultData: ReleaseDate[] = [];
        if (loadedData) {
            // 0-104 is what has been recorded so far
            loadedData.slice(0, 104).map((track: TrackData) => {
                fetchTrackAPIData(acesssToken, track['track_id']).then((result) => {
                    if (result) {
                        const resultDate = isolateDate(result as SpotifyTrackResponse);
                        const trackId = track['track_id'];
                        resultData.push({track_id: trackId, release_date: resultDate})
                    }
                });
            })
        }
        setColumnDataToJoin(resultData)
    }

    const isolateDate = (result: SpotifyTrackResponse) => {
        const track_date = result !== null ? result.album.release_date : "none"
        console.log(track_date)
        return track_date
    }

    const saveJSONFile = () => {
        const jsonBlob = new Blob([JSON.stringify(columnDataToJoin, null, 2)], {type: 'application/json'});
        saveAs(jsonBlob, 'release_dates_0_104.json'); // This will trigger a download
    };

    return (
        <Box>
            <Button
                onClick={() => {
                    fetchTrackData().then((result: any) => {
                        setColumnData(result)
                    })
                }}
            >
                Call Track JSON data
            </Button>
            <Button
                onClick={() => {
                    getSpotifyAccessToken().then((result: any) => {
                        handleAPIClick(result)
                    })
                }}
            >
                Call Api
            </Button>
            <Button
                onClick={() => {
                    saveJSONFile()
                }}
            >
                Download JSON File of Release Dates
            </Button>
            Press the button and then open the console for corresponding data
        </Box>
    );
};