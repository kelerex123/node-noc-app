import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';
import { CheckServiceMultiple } from './check-service-multiple';

describe('check-service-multiple.test.ts', () => {

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockSuccessCallback = jest.fn();
    const mockErrorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
        [mockRepository1, mockRepository2],
        mockSuccessCallback,
        mockErrorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch return true', async() => {

        const wasOk = await checkService.execute('https://google.com');
        
        expect(wasOk).toBe(true);
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockSuccessCallback).toHaveBeenCalled();
        expect(mockErrorCallback).not.toHaveBeenCalled();
        
    })

    test('should call errorCallback when fetch return false', async() => {

        const wasOk = await checkService.execute('https://asdasle.com');
        
        expect(wasOk).toBe(false);
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockSuccessCallback).not.toHaveBeenCalled();
        expect(mockErrorCallback).toHaveBeenCalled();
        
    })

});