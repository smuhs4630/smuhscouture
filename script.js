body {
    margin: 0;
    font-family: 'Roboto', sans-serif; /* Fallback für den Body, falls nötig */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #000; /* Schwarzer Hintergrund, da Videos/Bilder im Vordergrund sind */
    color: white; /* Standardtextfarbe weiß */
}

.slider-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
}

.slider-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
}

.slider-item.active {
    opacity: 1;
}

.slider-item video,
.slider-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* Glitch Effekt (unverändert, da er gut zum Thema passen kann) */
.glitch-effect {
    animation: glitch 0.3s infinite;
}

@keyframes glitch {
    0% { transform: translate(0, 0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0, 0); }
}

/* Logo wurde entfernt, die .logo Klasse kann gelöscht werden */
/* .logo { ... } */


.content-overlay {
    position: relative;
    z-index: 2; /* Über dem Slider */
    color: white;
    text-align: center;
    padding: 20px; /* Kann bei Bedarf angepasst werden */
    /* Der Hintergrund wird hier minimal gehalten, da der Schriftzug transparent ist */
    background-color: transparent;
    border-radius: 10px;
}

/* --- Spezifische Styling für "smuhs" und "couture" --- */
.smuhs-text {
    font-family: 'Roboto', sans-serif;
    font-size: 8em; /* Groß für "smuhs" */
    font-weight: 700; /* Robot hat 700wght */
    margin: 0;
    line-height: 1; /* Zeilenhöhe anpassen, um die Wörter nah zusammenzubringen */
    color: rgba(255, 255, 255, 0.6); /* Leicht transparentes Weiß */
    text-shadow: 0 0 10px rgba(0,0,0,0.5); /* Leichter Schatten für bessere Lesbarkeit auf helleren Medien */
}

.couture-text {
    font-family: 'Dancing Script', cursive;
    font-size: 4.5em; /* Etwas kleiner als smuhs, aber immer noch prominent */
    margin: -10px 0 40px 0; /* Negativer Top-Margin, um näher an "smuhs" zu rücken, und Bottom-Margin zum Button */
    line-height: 1;
    color: rgba(255, 255, 255, 0.7); /* Leicht transparenter als smuhs, aber gut sichtbar */
    text-shadow: 0 0 10px rgba(0,0,0,0.5); /* Leichter Schatten */
}

/* --- Button Styling --- */
#launchButton {
    background-color: #CC0000; /* Sattes Rot (RGB: 204, 0, 0) */
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 2em; /* Groß für "Release!" */
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    font-family: 'Caesar Dressing', cursive; /* Google Font: Caesar Dressing */
    text-transform: uppercase; /* Optional: Macht den Text groß, falls gewünscht */
    letter-spacing: 2px; /* Optional: Abstand zwischen den Buchstaben */
    font-weight: 400; /* Caeser Dressing hat nur 400 */
    box-shadow: 0 5px 15px rgba(0,0,0,0.3); /* Dezenter Schatten für den Button */
}

#launchButton:hover {
    background-color: #990000; /* Dunkleres Rot beim Hover */
    transform: translateY(-3px); /* Etwas stärkerer Hover-Effekt */
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}

.counter-text {
    font-size: 1.2em;
    margin-top: 20px; /* Abstand zum Button */
    display: block;
    color: rgba(255, 255, 255, 0.8); /* Gut lesbares Weiß */
    font-family: 'Roboto', sans-serif; /* Passend zur smuhs Schriftart */
    font-weight: 400;
}

/* --- Responsive Design für mobile Geräte --- */
@media (max-width: 768px) {
    .smuhs-text {
        font-size: 4.5em; /* Kleinere Größe auf Mobilgeräten */
    }

    .couture-text {
        font-size: 2.5em; /* Kleinere Größe auf Mobilgeräten */
        margin: -5px 0 20px 0; /* Margins anpassen */
    }

    #launchButton {
        padding: 10px 20px;
        font-size: 1.5em;
    }

    .counter-text {
        font-size: 1em;
        margin-top: 15px;
    }
}

/* Weitere Responsive Anpassungen bei Bedarf */
@media (max-width: 480px) {
    .smuhs-text {
        font-size: 3em;
    }

    .couture-text {
        font-size: 1.8em;
    }

    #launchButton {
        padding: 8px 15px;
        font-size: 1.2em;
    }
}