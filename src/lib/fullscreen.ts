export const enterFullscreen = async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  }
};

export const exitFullscreen = async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  }
};

export const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
};
