import crypto from 'crypto';

function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
}

export default generateUniqueId;
