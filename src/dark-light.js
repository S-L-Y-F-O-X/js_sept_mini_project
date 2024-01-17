"use strict";
class ThemeManager {
    constructor(toggleButtonId, themeIconId) {
        this.darkThemeEnabled = false;
        this.toggleButton = document.getElementById(toggleButtonId);
        this.themeIcon = document.getElementById(themeIconId);
        this.toggleButton.addEventListener('click', this.toggleTheme.bind(this));
        this.loadTheme();
    }
    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            if (savedTheme === 'dark-theme') {
                this.DarkTheme();
            }
        }
    }
    toggleTheme() {
        if (this.darkThemeEnabled) {
            this.LightTheme();
        }
        else {
            this.DarkTheme();
        }
        this.saveTheme(this.darkThemeEnabled ? 'dark-theme' : 'light-theme');
    }
    DarkTheme() {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        this.themeIcon.textContent = '🌜';
        this.darkThemeEnabled = true;
        this.saveTheme('dark-theme');
    }
    LightTheme() {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        this.themeIcon.textContent = '🌞';
        this.darkThemeEnabled = false;
        this.saveTheme('light-theme');
    }
}
const themeManager = new ThemeManager('theme-toggle', 'theme-icon');
