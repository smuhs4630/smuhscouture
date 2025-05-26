document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const launchButton = document.getElementById('launchButton');
    const counterSpan = document.getElementById('counter');
    const backgroundMusic = document.getElementById('backgroundMusic'); // Das Audio-Element

    let currentMediaIndex = 0;
    let launchCount = 0;

    // Wir simulieren das Auslesen von Medien, indem wir wissen, welche Dateitypen wir erwarten
    // Dies ist der beste Weg für statische Seiten auf Vercel, ohne einen Build-Step,
    // der die Dateiliste generiert.
    // Du musst sicherstellen, dass deine Dateien VIDEO1.mp4, VIDEO2.mp4, IMAGE1.jpg etc. heißen.
    const mediaFiles = [];
    const videoCount = 3; // Passe diese Zahl an deine tatsächliche Videoanzahl an
    const imageCount = 14; // Passe diese Zahl an deine tatsächliche Bildanzahl an

    for (let i = 1; i <= videoCount; i++) {
        mediaFiles.push({ type: 'video', src: `media/video${i}.mp4` });
    }
    for (let i = 1; i <= imageCount; i++) {
        mediaFiles.push({ type: 'image', src: `media/image${i}.jpg` });
    }

    // Optional: Mischen der Medien für eine zufällige Reihenfolge
    mediaFiles.sort(() => Math.random() - 0.5);


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
        mediaFiles.forEach(mediaItem => { // Verwende jetzt 'mediaFiles'
            sliderContainer.appendChild(createSliderItem(mediaItem));
        });

        // Zeige das erste Medium an
        const firstItem = sliderContainer.firstElementChild;
        if (firstItem) {
            firstItem.classList.add('active');
            if (firstItem.querySelector('video')) {
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
            // Keine Glitch-Effekt-Klasse mehr hinzufügen, da sie entfernt wurde
        }

        currentMediaIndex = (currentMediaIndex + 1) % mediaFiles.length; // Verwende 'mediaFiles.length'
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
    setInterval(showNextMedia, 5000); // Wechselt alle 5 Sekunden

    // Button-Klick-Handler
    launchButton.addEventListener('click', () => {
        launchCount++;
        counterSpan.textContent = launchCount;

        // Versuche, Musik abzuspielen, wenn der Button geklickt wird
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => {
                console.error("Musik konnte nicht abgespielt werden:", e);
                // Fehlermeldung, wenn Autoplay vom Browser blockiert wird
            });
        }
    });

    // Initialisierung des Sliders beim Laden der Seite
    initializeSlider();
});