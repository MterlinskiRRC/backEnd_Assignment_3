import * as eventService from '../src/api/v1/services/eventService';
import * as eventRepository from '../src/api/v1/repositories/eventRepository';
import { Event } from '../src/api/v1/models/Event';

// Mock the repository to isolate the service
jest.mock('../src/api/v1/repositories/eventRepository');

const mockedEventRepository = eventRepository as jest.Mocked<typeof eventRepository>;

describe('Event Service', () => {
    // Test for getAllEvents function
    describe('getAllEvents', () => {
        it('should return all events from the repository', async () => {
            // Arrange
            const events: Event[] = [
                { id: '1', name: 'Event 1', date: '2025-01-01', capacity: 100, registrationCount: 50, status: 'active', category: 'general', createdAt: '', updatedAt: '' },
                { id: '2', name: 'Event 2', date: '2025-02-01', capacity: 150, registrationCount: 100, status: 'active', category: 'general', createdAt: '', updatedAt: '' },
            ];
            mockedEventRepository.getAll.mockResolvedValue(events);

            // Act
            const result = await eventService.getAllEvents();

            // Assert
            expect(result).toEqual(events);
            expect(mockedEventRepository.getAll).toHaveBeenCalledTimes(1);
        });
    });

    // Test for getEventById function
    describe('getEventById', () => {
        it('should return a single event if found', async () => {
            // Arrange
            const event: Event = { id: '1', name: 'Event 1', date: '2025-01-01', capacity: 100, registrationCount: 50, status: 'active', category: 'general', createdAt: '', updatedAt: '' };
            mockedEventRepository.getById.mockResolvedValue(event);

            // Act
            const result = await eventService.getEventById('1');

            // Assert
            expect(result).toEqual(event);
            expect(mockedEventRepository.getById).toHaveBeenCalledWith('1');
        });

        it('should return null if no event is found', async () => {
            // Arrange
            mockedEventRepository.getById.mockResolvedValue(null);

            // Act
            const result = await eventService.getEventById('999');

            // Assert
            expect(result).toBeNull();
        });
    });

    // Test for createEvent function
    describe('createEvent', () => {
        it('should create and return a new event', async () => {
            // Arrange
            const eventData = { name: 'New Event', date: '2025-03-01', capacity: 200 };
            mockedEventRepository.create.mockResolvedValue(undefined);

            // Act
            const result = await eventService.createEvent(eventData);

            // Assert
            expect(result.name).toBe(eventData.name);
            expect(result.id).toBeDefined();
            expect(mockedEventRepository.create).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    // Test for updateEvent function
    describe('updateEvent', () => {
        it('should update and return the event if it exists', async () => {
            // Arrange
            const existingEvent: Event = { id: '1', name: 'Old Name', date: '2025-01-01', capacity: 100, registrationCount: 50, status: 'active', category: 'general', createdAt: '', updatedAt: '' };
            const updateData = { name: 'New Name' };
            mockedEventRepository.getById.mockResolvedValue(existingEvent);
            mockedEventRepository.update.mockResolvedValue(undefined);

            // Act
            const result = await eventService.updateEvent('1', updateData);

            // Assert
            expect(result?.name).toBe('New Name');
            expect(mockedEventRepository.update).toHaveBeenCalledWith('1', expect.objectContaining({ name: 'New Name' }));
        });

        it('should return null if the event to update does not exist', async () => {
            // Arrange
            mockedEventRepository.getById.mockResolvedValue(null);

            // Act
            const result = await eventService.updateEvent('999', { name: 'Non-existent' });

            // Assert
            expect(result).toBeNull();
        });
    });

    // Test for deleteEvent function
    describe('deleteEvent', () => {
        it('should return true if the event is deleted successfully', async () => {
            // Arrange
            mockedEventRepository.getById.mockResolvedValue({ id: '1', name: 'Event to delete', date: '2025-01-01', capacity: 100, registrationCount: 50, status: 'active', category: 'general', createdAt: '', updatedAt: '' });
            mockedEventRepository.remove.mockResolvedValue(undefined);

            // Act
            const result = await eventService.deleteEvent('1');

            // Assert
            expect(result).toBe(true);
            expect(mockedEventRepository.remove).toHaveBeenCalledWith('1');
        });

        it('should return false if the event to delete does not exist', async () => {
            // Arrange
            mockedEventRepository.getById.mockResolvedValue(null);

            // Act
            const result = await eventService.deleteEvent('999');

            // Assert
            expect(result).toBe(false);
        });
    });
});
