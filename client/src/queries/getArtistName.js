export default function getArtistName(artists, artistID) {
    const artist = artists.find(artist => artist.id === artistID);
    return artist ? artist.name : 'Artist not found';

}