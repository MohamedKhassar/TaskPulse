import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

// Set up multer storage
const storage = multer.diskStorage({
    destination: './public/profilePictures/', // Destination folder for profile pictures
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file to include current timestamp
    },
});

// Initialize multer
const upload = multer({ storage }).single('profilePicture');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        upload(req, res, (err: any) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json({ error: 'Multer error: ' + err.message });
            } else if (err) {
                res.status(500).json({ error: 'An error occurred: ' + err.message });
            } else {
                const { name } = req.body;
                const profilePicture = req.file?.filename || null;

                // Update user profile in the database
                // For demonstration purposes, let's assume the update is successful
                res.status(200).json({ success: true, name, profilePicture });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
