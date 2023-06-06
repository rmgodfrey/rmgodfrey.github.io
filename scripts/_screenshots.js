import { trapFocus } from './_modals.js';

const projects = document.querySelectorAll('.project');
const screenshots = document.querySelectorAll('.screenshot');
const sidebarThumbnails = document.querySelector(
  '.screenshot__container--margin'
);
const theatre = document.querySelector('.screenshot__theatre');
const frame = document.querySelector('.screenshot__frame');

let openThumbnail = null;

const revealSidebarGif = (project) => () => {
  const projectId = project.dataset.projectName;
  const projectTitle = project.querySelector('.project__title').innerText;
  const thumbnail = sidebarThumbnails.querySelector(
    `[data-project-name=${projectId}]`
  );
  if (thumbnail) {
    thumbnail.remove();
  } else {
    const gif = project.querySelector('.screenshot')
      .cloneNode(true);
    gif.addEventListener('click', enlarge);
    const screenshotProject = sidebarThumbnails.querySelector('template')
      .content
      .cloneNode(true)
      .querySelector('.screenshot__project');
      screenshotProject.querySelector('.screenshot__project-title').innerText
      = projectTitle;
      screenshotProject.querySelector('figure').append(gif);
    screenshotProject.dataset.projectName = projectId;
    sidebarThumbnails
      .querySelector('.screenshot__inner-container')
      .prepend(screenshotProject);
    sidebarThumbnails.scrollTop = 0;
  }
}

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
      'click', revealSidebarGif(project)
    );
  }
);

Array.prototype.forEach.call(screenshots, screenshot => {
  screenshot.addEventListener('click', enlarge);
});

frame.addEventListener('click', close);

trapFocus(theatre);
