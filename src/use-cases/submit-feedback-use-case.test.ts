import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

// Spies = espiões -> São formas da gente conseguir dentro do teste saber se 
// alguma função foi chamada 
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


const submitFeedback =new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)
describe('Submit feedback', () => {
    it('should be able to submit feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });


    it('should not ble able to submit feedback without a type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64',
        })).rejects.toThrow();
    });

    it('should not ble able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64',
        })).rejects.toThrow();
    });

    it('should not ble able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });
});