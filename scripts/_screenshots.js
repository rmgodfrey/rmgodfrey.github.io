import { trapFocus } from './_modals.js';

const projects = document.querySelectorAll('.project');
const screenshots = document.querySelectorAll('.screenshot');
const sidebarThumbnails = document.querySelectorAll(
  '.screenshot__container--margin .screenshot__project'
);
const theatre = document.querySelector('.screenshot__theatre');
const frame = document.querySelector('.screenshot__frame');

let openThumbnail = null;
let revealedSidebarThumbnails = null;

const revealSidebarThumbnails = (projectName) => () => {
  // If thumbnails are already revealed, hide them.
  if (revealedSidebarThumbnails) {
    revealedSidebarThumbnails.hidden = true;
  }
  // Find sidebar thumbnails corresponding to requested project
  const projectSidebarThumbnails = Array.prototype.find.call(
    sidebarThumbnails,
    thumbnails => thumbnails.dataset.projectName === projectName
  );
  // If these thumbnails are different from the ones that were already revealed,
  // show them.
  if (projectSidebarThumbnails !== revealedSidebarThumbnails) {
    projectSidebarThumbnails.hidden = false;
    revealedSidebarThumbnails = projectSidebarThumbnails;
  } else {
    revealedSidebarThumbnails = null;
  }
};

const enlarge = (event) => {
  // Display modal
  theatre.hidden = false;

  // Add enlarged screenshot to modal
  const thumbnail = event.currentTarget;
  const screenshotClone = thumbnail.cloneNode();
  screenshotClone.tabIndex = -1;
  frame.append(screenshotClone);

  // Hide thumbnail
  thumbnail.classList.add('screenshot--open');
  openThumbnail = thumbnail;

  // Focus close button
  const closeButton = frame.querySelector('.modal__close-button');
  closeButton.focus();
};

const close = (event) => {
  // Remove enlarged screenshot and hide modal
  const screenshot = event.currentTarget.querySelector('.screenshot');
  screenshot.remove();
  theatre.hidden = true;

  // Restore thumbnail of closed screenshot, and focus it
  openThumbnail.classList.remove('screenshot--open');
  openThumbnail.focus();
  openThumbnail = null;
}

document.addEventListener('keydown', (event) => {
  const activeElement = document.activeElement;
  switch (event.key) {
    case 'Enter':
      if (activeElement.classList.contains('screenshot')) {
        activeElement.click();
      }
    case ' ':
      if (activeElement.classList.contains('screenshot')) {
        event.preventDefault();
      }
      break;

    case 'Escape':
      if (theatre.hidden === false) {
        frame.click();
      }
      break;
  }
});

document.addEventListener('keyup', (event) => {
  const activeElement = document.activeElement;
  switch (event.key) {
    case ' ':
      if (activeElement.classList.contains('screenshot')) {
        activeElement.click();
      }
      break;
  }
});

Array.prototype.forEach.call(
  projects,
  project => {
    const button = project.querySelector('.screenshot__toggle');
    button?.addEventListener(
      'click', revealSidebarThumbnails(project.dataset.projectName)
    );
  }
);

Array.prototype.forEach.call(screenshots, screenshot => {
  screenshot.addEventListener('click', enlarge);
});

frame.addEventListener('click', close);

trapFocus(theatre);
