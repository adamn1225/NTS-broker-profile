import { registerBroker, getBrokers } from '../../../../backend/controllers/userController';

// Your route handler code
export async function POST(req, res) {
    await registerBroker(req, res);
}

export async function GET(req, res) {
    await getBrokers(req, res);
}