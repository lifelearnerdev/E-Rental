import bcrypt from 'bcryptjs';

export default pass => bcrypt.hashSync(pass, 10);
