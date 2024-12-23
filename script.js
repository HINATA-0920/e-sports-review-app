let players = []; // Store YouTube Player instances

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

                // Create YouTube Player instance
                players.push(new YT.Player(div.id, {
                    videoId: videoId,
                    playerVars: {
                        start: startTime,
                        enablejsapi: 1,
                    },
                }));
            } else {
                alert(`Invalid URL in input ${i}. Please check and try again.`);
            }
        }
    }
});

document.getElementById("playAll").addEventListener("click", () => {
    players.forEach(player => player.playVideo());
});

document.getElementById("pauseAll").addEventListener("click", () => {
    players.forEach(player => player.pauseVideo());
});

document.getElementById("forwardAll").addEventListener("click", () => {
    players.forEach(player => {
        const currentTime = player.getCurrentTime();
        player.seekTo(currentTime + 10, true); // Seek forward by 10 seconds
    });
});

document.getElementById("backwardAll").addEventListener("click", () => {
    players.forEach(player => {
        const currentTime = player.getCurrentTime();
        player.seekTo(currentTime - 10, true); // Seek backward by 10 seconds
    });
});

document.getElementById("generateUrls").addEventListener("click", () => {
    const generatedUrlsContainer = document.getElementById("generatedUrls");
    generatedUrlsContainer.innerHTML = ""; // Clear existing URLs

    players.forEach((player, index) => {
        const currentTime = Math.floor(player.getCurrentTime());
        const videoId = player.getVideoData().video_id;
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
    });
});

function extractYouTubeVideoIdAndTime(url) {
    const videoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const timeMatch = url.match(/[?&]t=(\d+)/);
    const videoId = videoMatch ? videoMatch[2] : null;
    const startTime = timeMatch ? parseInt(timeMatch[1], 10) : 0;
    return { videoId, startTime };
}
