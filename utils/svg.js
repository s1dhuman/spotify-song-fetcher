// utils/svg.js

// svg is a format - Scalable Vector Graphics (SVG) is an XML-based vector graphics format for defining two-dimensional graphics

// Generates a simple SVG showing song name, artist, and album art
export function createSvg(track) {
    const { name, artists, album } = track;
    const artistNames = artists.map((a) => a.name).join(', ');
    const albumImage = album.images[0]?.url;

    return `
  <svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
    <style>
      .title { font: bold 16px sans-serif; fill: #ffffff; }
      .artist { font: 14px sans-serif; fill: #cccccc; }
      .bg { fill: #1DB954; }
    </style>
    <rect class="bg" width="100%" height="100%" rx="12" />
    <image href="${albumImage}" x="10" y="10" height="100" width="100" />
    <text x="120" y="50" class="title">${name}</text>
    <text x="120" y="75" class="artist">${artistNames}</text>
  </svg>`;
}