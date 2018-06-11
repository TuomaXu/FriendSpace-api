import crypto from 'crypto';

export default (email,password)=>{
    const hash = crypto.createHash('md5');
    const date = new Date();
    const random = Math.random();
    hash.update(email + password + date + random);
    const access_token = hash.digest('hex');
    return access_token;
}