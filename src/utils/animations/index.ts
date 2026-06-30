export const slideLeft = {
  hidden: {
    opacity: 0,
    x: -150,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.4,
      duration: 0.8,
    },
  },
};

export const slideRight = {
  hidden: {
    opacity: 0,
    x: 150,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.4,
      duration: 0.8,
    },
  },
};

export const slideUp = {
  hidden: {
    opacity: 0,
    y: 300,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

export const slideDown = {
  hidden: {
    opacity: 0,
    y: -150,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

export const zoomIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -150,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};
