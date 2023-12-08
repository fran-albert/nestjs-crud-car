import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';

describe('CarsService', () => {
  let service: CarsService;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(Car),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of cars', async () => {
    mockRepository.find.mockReturnValue([]);
    const result = await service.findAll();
    expect(result.data).toBeInstanceOf(Array);
  });

  it('should return object of car', async () => {
    const carId = 1;
    const mockCar = { id: carId, brand: 'Test Brand', color: 'Test Color' };
    mockRepository.findOneBy.mockReturnValue(mockCar);
    const result = await service.findOne(carId);
    expect(result.data).toBeInstanceOf(Object);
  });

  it('should create car', async () => {
    const mockCar = { brand: 'Test Brand', color: 'Test Color' };
    mockRepository.save.mockReturnValue(mockCar);
    const result = await service.create(mockCar);
    expect(result).toBe(mockCar);
  });

  it('should update car', async () => {
    const carId = 1;
    const mockUpdateCarDto = {
      brand: 'Test Brand Updated',
      color: 'Test Color Updated',
    };
    const mockUpdatedCar = { id: carId, ...mockUpdateCarDto };
    const mockUpdateResult = { affected: 1 };

    mockRepository.update.mockReturnValue(Promise.resolve(mockUpdateResult));
    mockRepository.findOneBy.mockReturnValue(Promise.resolve(mockUpdatedCar));

    const result = await service.update(carId, mockUpdateCarDto);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual(mockUpdatedCar);
    expect(result.message).toBe('Car updated successfully');
  });

  it('should delete car', async () => {
    const carId = 1;
    const mockCar = { id: carId, brand: 'Test Brand', color: 'Test Color' };

    mockRepository.findOneBy.mockReturnValue(Promise.resolve(mockCar));
    mockRepository.softDelete.mockReturnValue(Promise.resolve({ affected: 1 }));

    const result = await service.remove(carId);

    expect(mockRepository.softDelete).toHaveBeenCalledWith(carId);
    expect(result.message).toBe('Car deleted successfully');
  });
});
