import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('check-service.test.ts', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockSuccessCallback = jest.fn();
    const mockErrorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        mockSuccessCallback,
        mockErrorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch return true', async() => {

        const wasOk = await checkService.execute('https://google.com');
        
        expect(wasOk).toBe(true);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockSuccessCallback).toHaveBeenCalled();
        expect(mockErrorCallback).not.toHaveBeenCalled();
        
    })

    test('should call errorCallback when fetch return false', async() => {

        const wasOk = await checkService.execute('https://asdasle.com');
        
        expect(wasOk).toBe(false);
        expect(mockSuccessCallback).not.toHaveBeenCalled();
        expect(mockErrorCallback).toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        
    })

});