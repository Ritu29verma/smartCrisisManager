// utils/themeUtils.js

export function lightenHSL(hslColor, percent = 20) {
  const match = hslColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return hslColor;

  let [_, h, s, l] = match.map(Number);
  l = Math.min(100, l + percent);
  return `hsl(${h}, ${s}%, ${l}%)`;
}


export const applyAccentColor = (color) => {
  document.documentElement.style.setProperty("--accent", color);
  localStorage.setItem("accentColor", color);
};

export const loadAccentFromStorage = () => {
  const saved = localStorage.getItem("accentColor");
  if (saved) {
    document.documentElement.style.setProperty("--accent", saved);
  }
};

export const applyTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

export const loadThemeFromStorage = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
