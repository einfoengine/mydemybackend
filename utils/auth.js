import bcrypt from 'bcrypt';

export const hassPassword = (pass) => {
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(12, (err, salt)=>{
            if(err){
                reject(err);
            }
            bcrypt.hash(pass, salt, (err, hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            })
        })
    });
}
export const comparePassword = (pass, hassed) => {
    return bcrypt.compare(pass, hassed);
}