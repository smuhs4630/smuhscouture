document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const launchButton = document.getElementById('launchButton');
    const counterSpan = document.getElementById('counter');
    const backgroundMusic = document.getElementById('backgroundMusic'); // Das Audio-Element

    let currentMediaIndex = 0;
    let launchCount = 0; // Initialwert

    // --- Zähler aus LocalStorage laden ---
    // Versuche, den Zähler aus dem LocalStorage zu laden
    const storedLaunchCount = localStorage.getItem('smuhsLaunchCount');
    if (storedLaunchCount !== null && !isNaN(storedLaunchCount)) { // Prüfen, ob Wert vorhanden und gültige Zahl ist
        launchCount = parseInt(storedLaunchCount, 10); // Konvertiere den gespeicherten String in eine Zahl
    }
    counterSpan.textContent = launchCount; // Zeige den geladenen Zählerstand sofort an


    // Wir simulieren das Auslesen von Medien, indem wir wissen, welche Dateitypen wir erwarten
    // Du musst sicherstellen, dass deine Dateien VIDEO1.mp4, VIDEO2.mp4, IMAGE1.jpg etc. heißen.
    const mediaFiles = [];
    const videoCount = 3; // PASSE DIESE ZAHL AN DEINE TATSÄCHLICHE VIDEOANZAHL AN
    const imageCount = 14; // PASSE DIESE ZAHL AN DEINE TATSÄCHLICHE BILDANZAHL AN

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
        if (mediaFiles.length === 0) {
            console.warn("Keine Medien zum Laden gefunden. Bitte Pfade und Anzahl überprüfen!");
            // Optional: Fallback-Anzeige, z.B. eine Fehlermeldung oder ein Standardbild
            sliderContainer.style.backgroundColor = '#333'; // Grauer Hintergrund als Hinweis
            return; // Funktion beenden, wenn keine Medien da sind
        }

        mediaFiles.forEach(mediaItem => {
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
        // Sicherstellen, dass überhaupt Medien geladen sind, bevor wir weitermachen
        if (mediaFiles.length === 0) {
            return;
        }

        const currentActive = document.querySelector('.slider-item.active');
        if (currentActive) {
            // Wenn das aktuelle Element ein Video ist, pausieren wir es
            const currentVideo = currentActive.querySelector('video');
            if (currentVideo) {
                currentVideo.pause();
            }
            currentActive.classList.remove('active');
        }

        currentMediaIndex = (currentMediaIndex + 1) % mediaFiles.length;
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
        // --- Zähler in LocalStorage speichern ---
        localStorage.setItem('smuhsLaunchCount', launchCount);

        // --- Musik abspielen beim Klick ---
        // Diese Logik ist entscheidend für Browser-Autoplay-Richtlinien
        if (backgroundMusic.paused) { // Prüfen, ob Musik pausiert ist (oder noch nicht gestartet)
            backgroundMusic.play().then(() => {
                console.log("Musik erfolgreich abgespielt!");
            }).catch(e => {
                console.error("Musik konnte nicht abgespielt werden:", e);
                // Dies wird oft passieren, wenn der Browser Autoplay blockiert.
                // Es kann eine Meldung in der Konsole sein, aber die Seite funktioniert.
            });
        }
    });

    // Initialisierung des Sliders beim Laden der Seite
    initializeSlider();
});