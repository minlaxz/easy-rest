import bcrypt from 'bcrypt';

export const validatePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error(`Error validating password : ${error}`);
    }
};

export const hashPassword = async (password, saltRounds) => {
    try {
        return await bcrypt.hash(password, saltRounds)
    } catch (error) {
        throw new Error(`Error hashing password : ${error}`);
    }
};

