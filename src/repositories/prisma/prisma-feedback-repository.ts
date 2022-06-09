import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repositories";
import { prisma } from '../../prisma';

export class PrismaFeedbackRepository implements FeedbacksRepository{
    async create(data: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type: data.type,
                comment: data.comment,
                screenshot: data.screenshot
            }
        });
    }
}