let players = []; // Store YouTube Player instances

// Load videos into the container
document.getElementById("loadVideos").addEventListener("click", function () {
    const container = document.getElementById("videoContainer");
    container.innerHTML = ""; // Clear existing videos
    players = []; // Reset player instances

    for (let i = 1; i <= 4; i++) {
        const urlInput = document.getElementById(`url${i}`).value.trim();
        if (urlInput) {
            const { videoId, startTime } = extractYouTubeVideoIdAndTime(urlInput);
            if (videoId) {
                const div = document.createElement("div");
                div.id = `player${i}`;
                container.appendChild(div);

                // Create YouTube Player instance with start time
                players.push(new YT.Player(div.id, {
                    videoId: videoId,
                    playerVars: {
                        start: startTime, // Set the start time if provided
                        enablejsapi: 1,
                    },
                }));
            } else {
                alert(`Invalid URL in input ${i}. Please check and try again.`);
            }
        }
    }
});

// Play all videos
document.getElementById("playAll").addEventListener("click", () => {
    players.forEach(player => {
        if (player && player.playVideo) player.playVideo();
    });
});

// Pause all videos
document.getElementById("pauseAll").addEventListener("click", () => {
    players.forEach(player => {
        if (player && player.pauseVideo) player.pauseVideo();
    });
});

// Forward all videos by 10 seconds
document.getElementById("forwardAll").addEventListener("click", () => {
    players.forEach(player => {
        if (player && player.getCurrentTime && player.seekTo) {
            const currentTime = player.getCurrentTime();
            player.seekTo(currentTime + 10, true); // Seek forward by 10 seconds
        }
    });
});

// Backward all videos by 10 seconds
document.getElementById("backwardAll").addEventListener("click", () => {
    players.forEach(player => {
        if (player && player.getCurrentTime && player.seekTo) {
            const currentTime = player.getCurrentTime();
            player.seekTo(Math.max(currentTime - 10, 0), true); // Seek backward by 10 seconds
        }
    });
});

// Generate time-stamped URLs for all videos
document.getElementById("generateUrls").addEventListener("click", () => {
    const generatedUrlsContainer = document.getElementById("generatedUrls");
    generatedUrlsContainer.innerHTML = ""; // Clear existing URLs

    players.forEach((player, index) => {
        if (player && player.getVideoData && player.getCurrentTime) {
            const videoData = player.getVideoData();
            const currentTime = Math.floor(player.getCurrentTime());
            const videoId = videoData.video_id;

            // Generate a custom URL
            const customUrl = `https://www.youtube.com/watch?v=${videoId}&t=${currentTime}s`;

            const urlElement = document.createElement("div");
            urlElement.textContent = `Video ${index + 1}: ${customUrl}`;
            const copyButton = document.createElement("button");
            copyButton.textContent = "Copy";
            copyButton.addEventListener("click", () => {
                navigator.clipboard.writeText(customUrl);
                alert("URL copied to clipboard!");
            });

            urlElement.appendChild(copyButton);
            generatedUrlsContainer.appendChild(urlElement);
        }
    });
});

// Function to extract YouTube video ID and optional start time
function extractYouTubeVideoIdAndTime(url) {
    const videoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/);
    const timeMatch = url.match(/[?&]t=(\d+)/);
    const videoId = videoMatch ? videoMatch[2] : null;
    const startTime = timeMatch ? parseInt(timeMatch[1], 10) : 0; // Default to 0 if no time specified
    return { videoId, startTime };
<<<<<<< HEAD
}
=======
}
>>>>>>> 9e14b40d20994ba57aac609a281dafbde2e60640
