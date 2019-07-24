import bcrypt from 'bcryptjs';

export default (falsePass, truePass) => bcrypt.compareSync(falsePass, truePass);
