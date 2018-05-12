import crypto from 'crypto';
/**
 * 生成随机的44位长度的Token
 * 
 * @export
 * @param {any} code 
 * @returns 
 */
export function generateToken(code) {
  return crypto.createHash('sha256')
    .update(code + 'ugnamsung 15331117' + new Date())
    .digest('hex');
}
