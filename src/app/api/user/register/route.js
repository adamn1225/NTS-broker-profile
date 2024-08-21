import { registerBroker, getBrokers } from '@controllers/userController';

export async function POST(req, res) {
    await registerBroker(req, res);
}

export async function GET(req, res) {
    await getBrokers(req, res);
}