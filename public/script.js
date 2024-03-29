function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
  document.querySelector(".formdiv").style.display = "none";
  document.getElementById("loveBox").style.display = "block";
}

function moveNoButton() {
  const button = document.getElementById("noBtn");
  //   const box = document.getElementById("loveBox");
  const maxX = window.innerWidth - button.offsetWidth;
  const maxY = window.innerHeight - button.offsetHeight;

  // Define a range for the button's position
  const minX = -25;
  const minY = -25;

  // Generate random coordinates within the defined range
  const newX = Math.max(
    minX,
    Math.min(maxX, Math.floor(Math.random() * (2 * 300 + 1)) - 150)
  );

  console.log(newX);

  const newY = Math.max(
    minY,
    Math.min(maxY, Math.floor(Math.random() * (2 * 300 + 1)) - 150)
  );

  console.log(newY);

  // Update the button's position
  button.style.transform = `translate(${newX}px, ${newY}px)`;
}

// function LoveMessage() {
//   const loveBox = document.getElementById("loveBoxp");
//   loveBox.innerHTML = '<p class="love-text">I Love ❤️ You Too Much</p>';
// }

let isAudioPlayingy = false;
const audioy = new Audio("yesmusic.mp3");
const audio_no = new Audio("nomusic.mp3");
function LoveMessage() {
  // Check if audio is not already playing
  if (!isAudioPlayingy) {
    audio_no.pause();
    audioy.play();
    isAudioPlayingy = true;
  }

  audioy.addEventListener("ended", () => {
    isAudioPlayingy = false;
  });

  audioy.addEventListener("pause", () => {
    isAudioPlayingy = false;
  });

  const name = document.getElementById("nameInput").value;
  // console.log(name);
  fetch("/love-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, response: "yes" }),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
        console.log(response.text());
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log(data); // Log the response from server
      const loveBox = document.getElementById("loveBoxp");
      loveBox.innerHTML =
        '<p class="love-text">I Love ❤️ You Too Much,</p>' + name;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function hideNoButton() {
  document.getElementById("noBtn").style.display = "none";
}
let isAudioPlaying = false;
function noMessage() {
  // Check if audio is not already playing
  if (!isAudioPlaying) {
    audio_no.play();
    isAudioPlaying = true;
  }

  audio_no.addEventListener("ended", () => {
    isAudioPlaying = false;
  });

  audio_no.addEventListener("pause", () => {
    isAudioPlaying = false;
  });

  const name = document.getElementById("nameInput").value;
  fetch("/no-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, response: "no" }),
  })
    .then((response) => {
      if (response.ok) {
        // If the response is successful, return the text
        return response.text();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      // Log the response text
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
