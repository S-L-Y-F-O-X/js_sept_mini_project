class ThemeManager {
    private darkThemeEnabled: boolean = false;
    private toggleButton: HTMLElement;
    private themeIcon: HTMLElement;

    constructor(toggleButtonId: string, themeIconId: string) {
        this.toggleButton = document.getElementById(toggleButtonId) as HTMLElement;
        this.themeIcon = document.getElementById(themeIconId) as HTMLElement;
        this.toggleButton.addEventListener('click', this.toggleTheme.bind(this));
        this.loadTheme();
    }

    private saveTheme(theme: string): void {
        localStorage.setItem('theme', theme);
    }
    private loadTheme(): void {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            if (savedTheme === 'dark-theme') {
                this.DarkTheme();
            }
        }
    }
    public toggleTheme(): void {
        if (this.darkThemeEnabled) {
            this.LightTheme();
        } else {
            this.DarkTheme();
        }
        this.saveTheme(this.darkThemeEnabled ? 'dark-theme' : 'light-theme');
    }

    private DarkTheme(): void {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        this.themeIcon.textContent = '🌜';
        this.darkThemeEnabled = true;
        this.saveTheme('dark-theme');
    }

    private LightTheme(): void {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        this.themeIcon.textContent = '🌞';
        this.darkThemeEnabled = false;
        this.saveTheme('light-theme');
    }
}

const themeManager = new ThemeManager('theme-toggle', 'theme-icon');