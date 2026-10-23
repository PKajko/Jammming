# Jammming Testing Notes

## Automated checks

- `npm run lint` — Passed
- `npm run build` — Passed

## Manual test cases

| Feature | Steps | Expected result | Result |
|---|---|---|---|
| Spotify login | Click “Connect to Spotify” and approve access | Return to Jammming connected to Spotify | Pass |
| Search | Search for “Eminem” | Matching tracks appear with name, artist, and album | Pass |
| Add track | Click `+` beside a result | Track appears in the playlist | Pass |
| Prevent duplicate | Add the same track twice | Track appears once | Pass |
| Remove track | Click `-` beside a playlist track | Track disappears from the playlist | Pass |
| Rename playlist | Change the playlist title | New title appears | Pass |
| Save playlist | Add tracks and click “Save To Spotify” | Private playlist is created in Spotify; Jammming clears it | Pass |
| Save empty playlist | Click “Save To Spotify” with no tracks | Jammming asks you to add a track | Pass |