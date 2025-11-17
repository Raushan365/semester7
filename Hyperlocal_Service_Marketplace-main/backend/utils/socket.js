let ioInstance = null;

export const initIo = (io) => {
  ioInstance = io;
};

export const getIo = () => ioInstance;

export default {
  initIo,
  getIo
};
