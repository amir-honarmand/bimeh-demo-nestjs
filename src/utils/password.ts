import * as bcrypt from "bcrypt";

export const generate = async (password: string) => {
	const salt: string = await bcrypt.genSalt();
	const hash: string = await bcrypt.hash(password, salt);
	return { password, salt, hash };
};

export const validate = async (password: string, salt: string, hash: string) => {
	try {
		const _hash: string = await bcrypt.hash(password, salt);
		if (hash === _hash) return true;
		else return false;
	} catch (e) {
		return false;
	}
};

export const testRegex = (password: string) => {
	return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,64}$/.test(password);
};
