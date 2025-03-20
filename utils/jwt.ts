import jwt from 'jsonwebtoken'

export const signToken = async (id: string): Promise<string> => {
    try {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is missing in .env file");
        }

        const token = jwt.sign({ userid: id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h",
        });

        return token;
    } catch (error) {
        console.error("Error signing token:", error);
        throw new Error("Token generation failed");
    }
};