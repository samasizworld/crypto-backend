import fs from 'fs';

// Load the .env file
export const setEnv = () => {
    const envContent = fs.readFileSync('./.env', 'utf8');
    envContent.split('\n').forEach((line: any) => {
        const [key, value] = line.split('=');
        process.env[key.trim()] = value.trim();
    })
}