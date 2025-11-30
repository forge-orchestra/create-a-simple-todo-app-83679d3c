import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

type Data = {
  id: number;
  title: string;
  completed: boolean;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  try {
    switch (req.method) {
      case 'GET':
        const items = await prisma.item.findMany();
        res.status(200).json(items);
        break;
      case 'POST':
        const { title, completed }: Data = req.body;
        if (typeof title !== 'string' || typeof completed !== 'boolean') {
          res.status(400).json({ error: 'Invalid input' });
          return;
        }
        const newItem = await prisma.item.create({
          data: { title, completed },
        });
        res.status(201).json(newItem);
        break;
      case 'PUT':
        const { id, title: updateTitle, completed: updateCompleted }: Data = req.body;
        if (typeof id !== 'number' || typeof updateTitle !== 'string' || typeof updateCompleted !== 'boolean') {
          res.status(400).json({ error: 'Invalid input' });
          return;
        }
        const updatedItem = await prisma.item.update({
          where: { id },
          data: { title: updateTitle, completed: updateCompleted },
        });
        res.status(200).json(updatedItem);
        break;
      case 'DELETE':
        const { id: deleteId }: { id: number } = req.body;
        if (typeof deleteId !== 'number') {
          res.status(400).json({ error: 'Invalid input' });
          return;
        }
        await prisma.item.delete({
          where: { id: deleteId },
        });
        res.status(204).end();
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default handler;