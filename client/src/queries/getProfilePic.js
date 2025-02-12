export default function getProfilePic(artists, artistID) {
    const artist = artists.find(artist => artist.id === artistID);
    return artist ? artist.profile_pic_path : 'Artist not found';

}