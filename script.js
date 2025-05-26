document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const launchButton = document.getElementById('launchButton');
    const counterSpan = document.getElementById('counter');

    let currentMediaIndex = 0;
    let launchCount = 0;

    // Definiere deine Medien (Videos und Bilder)
    // Achte darauf, dass die Pfade und Dateinamen korrekt sind
    const media = [
        { type: 'video', src: 'media/video1.mp4' },
        { type: 'image', src: 'media/image1.jpg' },
        { type: 'video', src: 'media/video2.mp4' },
        { type: 'image', src: 'media/image2.jpg' },
        { type: 'image', src: 'media/image3.jpg' },
        { type: 'video', src: 'media/video3.mp4' },
        { type: 'image', src: 'media/image4.jpg' },
        { type: 'image', src: 'media/image5.jpg' },
        { type: 'image', src: 'media/image6.jpg' },
        { type: 'image', src: 'media/image7.jpg' },
        { type: 'image', src: 'media/image8.jpg' },
        { type: 'image', src: 'media/image9.jpg' },
        { type: 'image', src: 'media/image10.jpg' },
        { type: 'image', src: 'media/image11.jpg' },
        { type: 'image', src: 'media/image12.jpg' },
        { type: 'image', src: 'media/image13.jpg' },
        { type: 'image', src: 'media/image14.jpg' }
    ];

    function createSliderItem(mediaItem) {
        const div = document.createElement('div');
        div.classList.add('slider-item');

        if (mediaItem.type === 'video') {
            const video = document.createElement('video');
            video.src = mediaItem.src;
            video.autoplay = true;
            video.loop = true;
            video.muted = true; // Videos im Hintergrund sollten stumm sein
            video.playsInline = true; // Wichtig für iOS, damit Videos automatisch abgespielt werden
            div.appendChild(video);
        } else if (mediaItem.type === 'image') {
            const img = document.createElement('img');
            img.src = mediaItem.src;
            div.appendChild(img);
        }
        return div;
    }

    function initializeSlider() {
        media.forEach(mediaItem => {
            sliderContainer.appendChild(createSliderItem(mediaItem));
        });

        // Zeige das erste Medium an
        const firstItem = sliderContainer.firstElementChild;
        if (firstItem) {
            firstItem.classList.add('active');
            if (firstItem.querySelector('video')) {
                // Spiele das Video nur ab, wenn es das aktive Element ist
                firstItem.querySelector('video').play();
            }
        }
    }

    function showNextMedia() {
        const currentActive = document.querySelector('.slider-item.active');
        if (currentActive) {
            // Wenn das aktuelle Element ein Video ist, pausieren wir es
            const currentVideo = currentActive.querySelector('video');
            if (currentVideo) {
                currentVideo.pause();
            }
            currentActive.classList.remove('active');
            currentActive.classList.add('glitch-effect'); // Glitch beim Wechsel hinzufügen

            // Entferne den Glitch-Effekt nach kurzer Zeit, um den nächsten Übergang vorzubereiten
            setTimeout(() => {
                currentActive.classList.remove('glitch-effect');
            }, 300); // Dauer des Glitch-Effekts
        }

        currentMediaIndex = (currentMediaIndex + 1) % media.length;
        const nextActive = sliderContainer.children[currentMediaIndex];

        if (nextActive) {
            nextActive.classList.add('active');
            const video = nextActive.querySelector('video');
            if (video) {
                video.currentTime = 0; // Setzt das Video auf den Anfang zurück
                video.play();
            }
        }
    }

    // Slider alle paar Sekunden wechseln
    // Du kannst die Zeit hier anpassen, z.B. 7000ms für 7 Sekunden
    setInterval(showNextMedia, 5000); // Wechselt alle 5 Sekunden

    // Button-Klick-Handler
    launchButton.addEventListener('click', () => {
        launchCount++;
        counterSpan.textContent = launchCount;
    });

    // Initialisierung des Sliders beim Laden der Seite
    initializeSlider();
});