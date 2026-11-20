export type Theme = "dark" | "light";

export const themeStorageKey = "axonrift-theme";
export const themeColors: Record<Theme, string> = {
  dark: "#0a1015",
  light: "#f5f7f8",
};

export function documentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => {
      meta.content = themeColors[theme];
    });
}

// This runs in the head before the page is painted. Storage can be unavailable
// in restricted browsers; dark remains the safe, server-rendered default.
export const themeInitScript = `(()=>{let theme="dark";try{if(localStorage.getItem(${JSON.stringify(themeStorageKey)})==="light")theme="light"}catch{}document.documentElement.dataset.theme=theme})();`;
