 document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const widgetIcon = document.getElementById('widgetIcon');
    const widgetContainer = document.getElementById('widgetContainer');
    const closeWidget = document.getElementById('closeWidget');
    
    // Accessibility controls
    const lineHeightBtn = document.getElementById('lineHeightBtn');
    const lineHeightBar = document.getElementById('lineHeightBar');
    const textToSpeechBtn = document.getElementById('textToSpeechBtn');
    const fontSizeDecrease = document.getElementById('fontSizeDecrease');
    const fontSizeIncrease = document.getElementById('fontSizeIncrease');
    const fontSizeDisplay = document.getElementById('fontSizeDisplay');
    const hideImagesBtn = document.getElementById('hideImagesBtn');
    const highlightLinksBtn = document.getElementById('highlightLinksBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const letterSpacingBtn = document.getElementById('letterSpacingBtn');
    const letterSpacingBar = document.getElementById('letterSpacingBar');
    const dyslexiaFontBtn = document.getElementById('dyslexiaFontBtn');
    const colorNormal = document.getElementById('colorNormal');
    const colorProtanopia = document.getElementById('colorProtanopia');
    const colorDeuteranopia = document.getElementById('colorDeuteranopia');
    const colorTritanopia = document.getElementById('colorTritanopia');
    const colorAchromatopsia = document.getElementById('colorAchromatopsia');
    const readingModeBtn = document.getElementById('readingModeBtn');
    const magnifyTextBtn = document.getElementById('magnifyTextBtn');
    const focusModeBtn = document.getElementById('focusModeBtn');
    const boldTextBtn = document.getElementById('boldTextBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // State variables
    let lineHeightLevel = 0;
    let letterSpacingLevel = 0;
    let fontSizeLevel = 100;
    let textToSpeechEnabled = false;
    let hideImagesEnabled = false;
    let highlightLinksEnabled = false;
    let darkModeEnabled = false;
    let dyslexiaFontEnabled = false;
    let readingModeEnabled = false;
    let magnifyTextEnabled = false;
    let focusModeEnabled = false;
    let boldTextEnabled = false;
    let currentColorFilter = 'none';
    let speechSynthesis = window.speechSynthesis;
    let utterance = null;
    let lastMagnifiedElement = null;
    let focusOverlay = null;
    let currentFocusElement = null;
    
    // Initialize widget
    function initWidget() {
        // Load saved settings from localStorage
        loadSettings();
    }
    
    // Load saved settings from localStorage
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
        
        if (settings.lineHeightLevel) {
            lineHeightLevel = settings.lineHeightLevel;
            updateLineHeight();
        }
        
        if (settings.letterSpacingLevel) {
            letterSpacingLevel = settings.letterSpacingLevel;
            updateLetterSpacing();
        }
        
        if (settings.fontSizeLevel) {
            fontSizeLevel = settings.fontSizeLevel;
            updateFontSize();
        }
        
        if (settings.textToSpeechEnabled) {
            textToSpeechEnabled = settings.textToSpeechEnabled;
            updateTextToSpeechButton();
            setupTextToSpeech();
        }
        
        if (settings.hideImagesEnabled) {
            hideImagesEnabled = settings.hideImagesEnabled;
            toggleImages();
        }
        
        if (settings.highlightLinksEnabled) {
            highlightLinksEnabled = settings.highlightLinksEnabled;
            toggleHighlightLinks();
        }
        
        if (settings.darkModeEnabled) {
            darkModeEnabled = settings.darkModeEnabled;
            toggleDarkMode();
        }
        
        if (settings.dyslexiaFontEnabled) {
            dyslexiaFontEnabled = settings.dyslexiaFontEnabled;
            toggleDyslexiaFont();
        }
        
        if (settings.readingModeEnabled) {
            readingModeEnabled = settings.readingModeEnabled;
            toggleReadingMode();
        }
        
        if (settings.magnifyTextEnabled) {
            magnifyTextEnabled = settings.magnifyTextEnabled;
            toggleMagnifyText();
        }
        
        if (settings.focusModeEnabled) {
            focusModeEnabled = settings.focusModeEnabled;
            toggleFocusMode();
        }
        
        if (settings.boldTextEnabled) {
            boldTextEnabled = settings.boldTextEnabled;
            toggleBoldText();
        }
        
        if (settings.currentColorFilter) {
            currentColorFilter = settings.currentColorFilter;
            applyColorFilter();
            updateColorBlindnessButtons();
        }
    }
    
    // Save settings to localStorage
    function saveSettings() {
        const settings = {
            lineHeightLevel,
            letterSpacingLevel,
            fontSizeLevel,
            textToSpeechEnabled,
            hideImagesEnabled,
            highlightLinksEnabled,
            darkModeEnabled,
            dyslexiaFontEnabled,
            readingModeEnabled,
            magnifyTextEnabled,
            focusModeEnabled,
            boldTextEnabled,
            currentColorFilter
        };
        
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    }
    
    // Toggle widget visibility
    widgetIcon.addEventListener('click', function() {
        widgetContainer.style.display = widgetContainer.style.display === 'block' ? 'none' : 'block';
    });
    
    closeWidget.addEventListener('click', function() {
        widgetContainer.style.display = 'none';
    });
    
    // Line height controls
    lineHeightBtn.addEventListener('click', function() {
        lineHeightLevel = (lineHeightLevel + 1) % 5;
        updateLineHeight();
        saveSettings();
    });
    
    function updateLineHeight() {
        document.documentElement.classList.remove('line-height-0', 'line-height-1', 'line-height-2', 'line-height-3', 'line-height-4');
        
        if (lineHeightLevel > 0) {
            document.documentElement.classList.add(`line-height-${lineHeightLevel}`);
        }
        
        lineHeightBar.style.width = `${lineHeightLevel * 25}%`;
    }
    
    // Letter spacing controls
    letterSpacingBtn.addEventListener('click', function() {
        letterSpacingLevel = (letterSpacingLevel + 1) % 4;
        updateLetterSpacing();
        saveSettings();
    });
    
    function updateLetterSpacing() {
        document.documentElement.classList.remove('letter-spacing-0', 'letter-spacing-1', 'letter-spacing-2', 'letter-spacing-3');
        
        if (letterSpacingLevel > 0) {
            document.documentElement.classList.add(`letter-spacing-${letterSpacingLevel}`);
        }
        
        letterSpacingBar.style.width = `${letterSpacingLevel * 33.33}%`;
    }
    
    // Text to speech controls
    textToSpeechBtn.addEventListener('click', function() {
        textToSpeechEnabled = !textToSpeechEnabled;
        updateTextToSpeechButton();
        setupTextToSpeech();
        saveSettings();
    });
    
    function updateTextToSpeechButton() {
        textToSpeechBtn.textContent = textToSpeechEnabled ? 'Disable' : 'Enable';
        textToSpeechBtn.classList.toggle('active', textToSpeechEnabled);
    }
    
    function setupTextToSpeech() {
        if (textToSpeechEnabled) {
            document.addEventListener('mouseover', handleMouseOverForSpeech);
            document.addEventListener('click', handleClickForSpeech);
            document.addEventListener('selectionchange', handleSelectionForSpeech);
        } else {
            document.removeEventListener('mouseover', handleMouseOverForSpeech);
            document.removeEventListener('click', handleClickForSpeech);
            document.removeEventListener('selectionchange', handleSelectionForSpeech);
            
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
        }
    }
    
    function handleMouseOverForSpeech(event) {
        if (event.target.textContent && event.target.textContent.trim() !== '') {
            // Cancel any previous speech
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
            
            // Speak the text
            speakText(event.target.textContent);
        }
    }
    
    function handleClickForSpeech(event) {
        if (event.target.textContent && event.target.textContent.trim() !== '') {
            // Cancel any previous speech
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
            
            // Speak the text
            speakText(event.target.textContent);
        }
    }
    
    function handleSelectionForSpeech() {
        const selection = window.getSelection();
        if (selection.toString().trim() !== '') {
            // Cancel any previous speech
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
            
            // Speak the selected text
            speakText(selection.toString());
        }
    }
    
   // Modified speakText function to handle Hindi content
   function speakText(text) {
    if (utterance) {
        speechSynthesis.cancel();
    }
    
    utterance = new SpeechSynthesisUtterance(text);
    
    
    // Detect if text contains Hindi characters
    const hindiRegex = /[\u0900-\u097F]/;
    if (hindiRegex.test(text)) {
        // Try to find a Hindi voice
        const hindiVoices = speechSynthesis.getVoices().filter(voice => {
            return voice.lang.includes('hi') || voice.lang.includes('HI');
        });
        
        if (hindiVoices.length > 0) {
            utterance.voice = hindiVoices[0];
            utterance.lang = 'hi-IN';
        } else {
            console.log('No Hindi voice found, using default');
        }
    } else {
        // Default to English
        utterance.lang = 'en-US';
    }
    
    speechSynthesis.speak(utterance);
}

// Initialize speech synthesis voices
let voicesReady = false;

function loadVoices() {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        voicesReady = true;
    }
}

// Chrome needs this
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Modified handleMouseOverForSpeech to use speakText
function handleMouseOverForSpeech(event) {
    if (event.target.textContent && event.target.textContent.trim() !== '') {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        
        // Give voices time to load
        if (!voicesReady) {
            setTimeout(() => {
                speakText(event.target.textContent);
            }, 500);
        } else {
            speakText(event.target.textContent);
        }
    }
}

    



     // Font size controls
     fontSizeDecrease.addEventListener('click', function() {
        if (fontSizeLevel > 70) {
            fontSizeLevel -= 10;
            updateFontSize();
            saveSettings();
        }
    });
    
    fontSizeIncrease.addEventListener('click', function() {
        if (fontSizeLevel < 200) {
            fontSizeLevel += 10;
            updateFontSize();
            saveSettings();
        }
    });
    
    function updateFontSize() {
        document.documentElement.classList.toggle('font-size-adjusted', fontSizeLevel !== 100);
        document.documentElement.style.setProperty('--current-font-size', `${fontSizeLevel}%`);
        fontSizeDisplay.textContent = `${fontSizeLevel}%`;
    }
    
    
    // Hide images controls
    hideImagesBtn.addEventListener('click', function() {
        hideImagesEnabled = !hideImagesEnabled;
        toggleImages();
        saveSettings();
    });
    
    function toggleImages() {
        if (hideImagesEnabled) {
            document.documentElement.classList.add('hide-images');
        } else {
            document.documentElement.classList.remove('hide-images');
        }
        hideImagesBtn.classList.toggle('active', hideImagesEnabled);
    }
    
    // Highlight links controls
    highlightLinksBtn.addEventListener('click', function() {
        highlightLinksEnabled = !highlightLinksEnabled;
        toggleHighlightLinks();
        saveSettings();
    });
    
    function toggleHighlightLinks() {
        if (highlightLinksEnabled) {
            document.documentElement.classList.add('highlight-links');
        } else {
            document.documentElement.classList.remove('highlight-links');
        }
        highlightLinksBtn.classList.toggle('active', highlightLinksEnabled);
    }
    
    // Dark mode controls
    darkModeBtn.addEventListener('click', function() {
        darkModeEnabled = !darkModeEnabled;
        toggleDarkMode();
        saveSettings();
    });
    
    function toggleDarkMode() {
        if (darkModeEnabled) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
        darkModeBtn.classList.toggle('active', darkModeEnabled);
    }
    
    // Dyslexia font controls
    dyslexiaFontBtn.addEventListener('click', function() {
        dyslexiaFontEnabled = !dyslexiaFontEnabled;
        toggleDyslexiaFont();
        saveSettings();
    });
    
    function toggleDyslexiaFont() {
        if (dyslexiaFontEnabled) {
            document.documentElement.classList.add('dyslexia-font');
        } else {
            document.documentElement.classList.remove('dyslexia-font');
        }
        dyslexiaFontBtn.classList.toggle('active', dyslexiaFontEnabled);
    }
    
    // Color blindness controls
    colorNormal.addEventListener('click', function() {
        currentColorFilter = 'none';
        applyColorFilter();
        updateColorBlindnessButtons();
        saveSettings();
    });
    
    colorProtanopia.addEventListener('click', function() {
        currentColorFilter = 'protanopia';
        applyColorFilter();
        updateColorBlindnessButtons();
        saveSettings();
    });
    
    colorDeuteranopia.addEventListener('click', function() {
        currentColorFilter = 'deuteranopia';
        applyColorFilter();
        updateColorBlindnessButtons();
        saveSettings();
    });
    
    colorTritanopia.addEventListener('click', function() {
        currentColorFilter = 'tritanopia';
        applyColorFilter();
        updateColorBlindnessButtons();
        saveSettings();
    });
    
    colorAchromatopsia.addEventListener('click', function() {
        currentColorFilter = 'achromatopsia';
        applyColorFilter();
        updateColorBlindnessButtons();
        saveSettings();
    });
    
    function applyColorFilter() {
        if (currentColorFilter === 'none') {
            document.documentElement.style.filter = '';
        } else {
            document.documentElement.style.filter = `url(#${currentColorFilter})`;
        }
    }
    
    function updateColorBlindnessButtons() {
        colorNormal.classList.toggle('active', currentColorFilter === 'none');
        colorProtanopia.classList.toggle('active', currentColorFilter === 'protanopia');
        colorDeuteranopia.classList.toggle('active', currentColorFilter === 'deuteranopia');
        colorTritanopia.classList.toggle('active', currentColorFilter === 'tritanopia');
        colorAchromatopsia.classList.toggle('active', currentColorFilter === 'achromatopsia');
    }
    
    // Reading mode controls
    readingModeBtn.addEventListener('click', function() {
        readingModeEnabled = !readingModeEnabled;
        toggleReadingMode();
        saveSettings();
    });
    
    function toggleReadingMode() {
        if (readingModeEnabled) {
            document.documentElement.classList.add('reading-mode');
        } else {
            document.documentElement.classList.remove('reading-mode');
        }
        readingModeBtn.classList.toggle('active', readingModeEnabled);
    }
    
    // Magnify text controls
    magnifyTextBtn.addEventListener('click', function() {
        magnifyTextEnabled = !magnifyTextEnabled;
        toggleMagnifyText();
        updateMagnifyTextButton();
        saveSettings();
    });
    
    function updateMagnifyTextButton() {
        magnifyTextBtn.textContent = magnifyTextEnabled ? 'Disable' : 'Enable';
        magnifyTextBtn.classList.toggle('active', magnifyTextEnabled);
    }
    
    function toggleMagnifyText() {
        if (magnifyTextEnabled) {
            document.addEventListener('mouseover', handleMouseOverForMagnify);
            document.addEventListener('mouseout', handleMouseOutForMagnify);
        } else {
            document.removeEventListener('mouseover', handleMouseOverForMagnify);
            document.removeEventListener('mouseout', handleMouseOutForMagnify);
            
            // Remove all magnify classes
            if (lastMagnifiedElement) {
                lastMagnifiedElement.classList.remove('magnify-text');
                lastMagnifiedElement.removeAttribute('data-text');
                lastMagnifiedElement = null;
            }
        }
    }
    
    function handleMouseOverForMagnify(event) {
        if (event.target.textContent && event.target.textContent.trim() !== '' && 
            !event.target.classList.contains('accessibility-widget') && 
            !event.target.closest('.accessibility-widget')) {
            
            // Remove magnify from previous element
            if (lastMagnifiedElement) {
                lastMagnifiedElement.classList.remove('magnify-text');
                lastMagnifiedElement.removeAttribute('data-text');
            }
            
            // Add magnify to current element
            event.target.classList.add('magnify-text');
            event.target.setAttribute('data-text', event.target.textContent);
            lastMagnifiedElement = event.target;
        }
    }
    
    function handleMouseOutForMagnify(event) {
        if (event.target.classList.contains('magnify-text')) {
            event.target.classList.remove('magnify-text');
            event.target.removeAttribute('data-text');
        }
    }
    
    // Focus mode controls
    focusModeBtn.addEventListener('click', function() {
        focusModeEnabled = !focusModeEnabled;
        toggleFocusMode();
        updateFocusModeButton();
        saveSettings();
    });
    
    function updateFocusModeButton() {
        focusModeBtn.textContent = focusModeEnabled ? 'Disable' : 'Enable';
        focusModeBtn.classList.toggle('active', focusModeEnabled);
    }
    
    function toggleFocusMode() {
        if (focusModeEnabled) {
            // Create overlay if it doesn't exist
            if (!focusOverlay) {
                focusOverlay = document.createElement('div');
                focusOverlay.className = 'focus-overlay';
                document.body.appendChild(focusOverlay);
            }
            
            document.documentElement.classList.add('focus-mode-enabled');
            document.addEventListener('mousemove', handleMouseMoveForFocus);
        } else {
            document.documentElement.classList.remove('focus-mode-enabled');
            document.removeEventListener('mousemove', handleMouseMoveForFocus);
            
            // Remove overlay if it exists
            if (focusOverlay) {
                document.body.removeChild(focusOverlay);
                focusOverlay = null;
            }
            
            // Remove focus highlight
            if (currentFocusElement) {
                currentFocusElement.classList.remove('focus-highlight');
                currentFocusElement = null;
            }
        }
    }
    
    function handleMouseMoveForFocus(event) {
        // Find the nearest text-containing element
        let target = document.elementFromPoint(event.clientX, event.clientY);
        
        // Walk up the DOM tree to find a suitable element
        while (target && target !== document.documentElement) {
            if (target.textContent && target.textContent.trim().length > 0 && 
                target.clientHeight > 0 &&
                !target.classList.contains('accessibility-widget') &&
                !target.closest('.accessibility-widget')) {
                break;
            }
            target = target.parentNode;
        }
        
        // Remove highlight from previous element
        if (currentFocusElement && currentFocusElement !== target) {
            currentFocusElement.classList.remove('focus-highlight');
        }
        
        // Add highlight to current element
        if (target && target !== document.documentElement) {
            target.classList.add('focus-highlight');
            currentFocusElement = target;
            
            // Position the highlight bar
            const rect = target.getBoundingClientRect();
            const highlightBar = target.querySelector('.focus-highlight::before') || 
                              document.createElement('div');
            highlightBar.className = 'focus-highlight-bar';
            highlightBar.style.top = `${rect.top + window.scrollY}px`;
            highlightBar.style.height = `${rect.height}px`;
        }
    }
    
    // Bold text controls
    boldTextBtn.addEventListener('click', function() {
        boldTextEnabled = !boldTextEnabled;
        toggleBoldText();
        saveSettings();
    });
    
    function toggleBoldText() {
        if (boldTextEnabled) {
            document.documentElement.classList.add('bold-text-enabled');
        } else {
            document.documentElement.classList.remove('bold-text-enabled');
        }
        boldTextBtn.classList.toggle('active', boldTextEnabled);
    }
    
    // Reset all settings
    resetBtn.addEventListener('click', function() {
        // Reset all state variables
        lineHeightLevel = 0;
        letterSpacingLevel = 0;
        fontSizeLevel = 100;
        textToSpeechEnabled = false;
        hideImagesEnabled = false;
        highlightLinksEnabled = false;
        darkModeEnabled = false;
        dyslexiaFontEnabled = false;
        readingModeEnabled = false;
        magnifyTextEnabled = false;
        focusModeEnabled = false;
        boldTextEnabled = false;
        currentColorFilter = 'none';
        
        // Reset all visual effects
        document.documentElement.className = '';
        document.documentElement.style.fontSize = '';
        document.documentElement.style.filter = '';
        document.documentElement.style.setProperty('--current-font-size', '');
        
        // Reset text to speech
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        setupTextToSpeech();
        
        // Remove focus overlay if exists
        if (focusOverlay) {
            document.body.removeChild(focusOverlay);
            focusOverlay = null;
        }
        
        // Remove focus highlight
        if (currentFocusElement) {
            currentFocusElement.classList.remove('focus-highlight');
            currentFocusElement = null;
        }
        
        // Reset progress bars
        lineHeightBar.style.width = '0%';
        letterSpacingBar.style.width = '0%';
        fontSizeDisplay.textContent = '100%';
        
        // Update buttons
        updateTextToSpeechButton();
        updateMagnifyTextButton();
        updateFocusModeButton();
        updateColorBlindnessButtons();
        
        // Update toggle buttons
        hideImagesBtn.classList.remove('active');
        highlightLinksBtn.classList.remove('active');
        darkModeBtn.classList.remove('active');
        dyslexiaFontBtn.classList.remove('active');
        readingModeBtn.classList.remove('active');
        magnifyTextBtn.classList.remove('active');
        focusModeBtn.classList.remove('active');
        boldTextBtn.classList.remove('active');
        
        // Clear saved settings
        localStorage.removeItem('accessibilitySettings');
    });
    
    // Initialize the widget
    initWidget();
    
    // Hover effect for widget icon
    widgetIcon.addEventListener('mouseenter', function() {
        this.style.width = '200px';
        this.style.borderRadius = '25px';
        this.innerHTML = '<i class="fas fa-universal-access"></i> <span>Accessibility Options</span>';
    });
    
    widgetIcon.addEventListener('mouseleave', function() {
        this.style.width = '50px';
        this.style.borderRadius = '50%';
        this.innerHTML = '<i class="fas fa-universal-access"></i>';
    });
});